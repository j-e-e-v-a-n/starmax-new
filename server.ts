import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ImageKit from 'imagekit';
import nodemailer from 'nodemailer';
import multer from 'multer';
import { CLIENTS } from './src/data/clients';
import { GALLERY_ITEMS } from './src/data/gallery';
import { TESTIMONIALS } from './src/data/testimonials';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const mongoClient = new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017');
let mongoPromise: Promise<MongoClient> | null = null;
const db = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MongoDB is not configured. Set MONGODB_URI.');
  mongoPromise ??= mongoClient.connect();
  await mongoPromise;
  return mongoClient.db(process.env.MONGODB_DB || 'starmax');
};
const collections = ['clients', 'gallery', 'testimonials'] as const;
const tokenSecret = process.env.ADMIN_JWT_SECRET || '';
const media = process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL_ENDPOINT
  ? new ImageKit({ publicKey: process.env.IMAGEKIT_PUBLIC_KEY, privateKey: process.env.IMAGEKIT_PRIVATE_KEY, urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT })
  : null;

const careerResumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const validExtension = ['.pdf', '.doc', '.docx'].includes(extension);
    const validMime = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/octet-stream'].includes(file.mimetype);
    if (!validExtension || !validMime) return callback(new Error('Upload a PDF, DOC, or DOCX resume.'));
    callback(null, true);
  },
});

function parseCareerResume(req: Request, res: Response, next: NextFunction) {
  careerResumeUpload.single('resume')(req, res, (error: unknown) => {
    if (!error) return next();
    const message = error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE'
      ? 'Resume exceeds the 5 MB upload limit.'
      : error instanceof Error ? error.message : 'Resume upload failed.';
    return res.status(400).json({ success: false, message });
  });
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!tokenSecret) return res.status(503).json({ success: false, message: 'Admin authentication is not configured.' });
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  try {
    if (!token) throw new Error('Missing token');
    (req as Request & { admin?: jwt.JwtPayload }).admin = jwt.verify(token, tokenSecret) as jwt.JwtPayload;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Please sign in to continue.' });
  }
}

app.post('/api/admin/login', async (req: Request, res: Response) => {
  if (!tokenSecret || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return res.status(503).json({ success: false, message: 'Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_JWT_SECRET before signing in.' });
  }
  try {
    const database = await db();
    const ownerEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const ownerPassword = process.env.ADMIN_PASSWORD;
    if (ownerEmail && ownerPassword && !await database.collection('admins').findOne({ email: ownerEmail })) {
      await database.collection('admins').insertOne({ email: ownerEmail, passwordHash: await bcrypt.hash(ownerPassword, 12), role: 'owner', createdAt: new Date() });
    }
    for (const [name, source] of [['clients', CLIENTS], ['gallery', GALLERY_ITEMS], ['testimonials', TESTIMONIALS]] as const) {
      if (await database.collection(name).estimatedDocumentCount() === 0) {
        await database.collection(name).insertMany(source.map((item, order) => ({ ...item, active: true, order })));
      }
    }
    const email = String(req.body.email || '').trim().toLowerCase();
    const admin = await database.collection('admins').findOne({ email });
    if (!admin || !await bcrypt.compare(String(req.body.password || ''), String(admin.passwordHash))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const token = jwt.sign({ sub: admin._id.toString(), email: admin.email, role: admin.role }, tokenSecret, { expiresIn: '12h' });
    return res.json({ success: true, data: { token, email: admin.email, role: admin.role } });
  } catch (error) { return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Login failed.' }); }
});

app.get('/api/content/:type', async (req: Request, res: Response) => {
  if (!collections.includes(req.params.type as typeof collections[number])) return res.status(404).json({ success: false, message: 'Unknown content type.' });
  try {
    const items = await (await db()).collection(req.params.type).find({ active: { $ne: false } }).sort({ order: 1, _id: 1 }).toArray();
    return res.json({ success: true, data: items.map(({ _id, ...item }) => ({ ...item, id: String(item.id || _id) })) });
  } catch (error) { return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Content unavailable.' }); }
});

app.get('/api/admin/content/:type', requireAdmin, async (req: Request, res: Response) => {
  if (!collections.includes(req.params.type as typeof collections[number])) return res.status(404).json({ success: false, message: 'Unknown content type.' });
  try {
    const items = await (await db()).collection(req.params.type).find().sort({ order: 1, _id: 1 }).toArray();
    return res.json({ success: true, data: items.map(({ _id, ...item }) => ({ ...item, id: String(item.id || _id) })) });
  } catch (error) { return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Content unavailable.' }); }
});

app.post('/api/admin/content/:type', requireAdmin, async (req: Request, res: Response) => {
  if (!collections.includes(req.params.type as typeof collections[number])) return res.status(404).json({ success: false, message: 'Unknown content type.' });
  try {
    const payload = { ...req.body, id: String(req.body.id || new ObjectId()), updatedAt: new Date() };
    await (await db()).collection(req.params.type).updateOne({ id: payload.id }, { $set: payload }, { upsert: true });
    return res.json({ success: true, data: payload });
  } catch (error) { return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Save failed.' }); }
});

app.delete('/api/admin/content/:type/:id', requireAdmin, async (req: Request, res: Response) => {
  if (!collections.includes(req.params.type as typeof collections[number])) return res.status(404).json({ success: false, message: 'Unknown content type.' });
  try {
    await (await db()).collection(req.params.type).deleteOne({ id: req.params.id });
    return res.json({ success: true, message: 'Item deleted.' });
  } catch (error) { return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Delete failed.' }); }
});

app.get('/api/admin/enquiries', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const database = await db();
    const [enquiries, callbacks, careers] = await Promise.all([
      database.collection('enquiries').find().sort({ createdAt: -1 }).limit(500).toArray(),
      database.collection('callbacks').find().sort({ createdAt: -1 }).limit(500).toArray(),
      database.collection('careerApplications').find({}, { projection: { 'resume.contents': 0 } }).sort({ createdAt: -1 }).limit(500).toArray(),
    ]);
    const combined = [
      ...enquiries.map((record) => ({ record, kind: 'Enquiry' })),
      ...callbacks.map((record) => ({ record, kind: 'Callback request' })),
      ...careers.map((record) => ({ record, kind: 'Career application' })),
    ].sort((a, b) => new Date(String(b.record.createdAt)).getTime() - new Date(String(a.record.createdAt)).getTime());
    const data = combined.map(({ record, kind }) => {
      const { _id, ...item } = record;
      return { ...item, kind, id: String(_id) };
    });
    return res.json({ success: true, data });
  } catch (error) { return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Inbox unavailable.' }); }
});

app.get('/api/admin/careers/:id/resume', requireAdmin, async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid application ID.' });
  try {
    const application = await (await db()).collection('careerApplications').findOne({ _id: new ObjectId(req.params.id) });
    if (!application?.resume?.contents) return res.status(404).json({ success: false, message: 'Resume not found.' });
    const stored = application.resume.contents as Buffer | { value: (asRaw?: boolean) => Uint8Array };
    const contents = Buffer.isBuffer(stored) ? stored : Buffer.from(stored.value(true));
    const filename = String(application.resume.fileName || 'resume').replace(/[\\/\r\n";]/g, '_');
    res.setHeader('Content-Type', String(application.resume.mimeType || 'application/octet-stream'));
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'private, no-store');
    return res.send(contents);
  } catch (error) { return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Could not download resume.' }); }
});

app.post('/api/admin/admins', requireAdmin, async (req: Request, res: Response) => {
  if ((req as Request & { admin?: jwt.JwtPayload }).admin?.role !== 'owner') return res.status(403).json({ success: false, message: 'Only the owner can add administrators.' });
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (!email || password.length < 12) return res.status(400).json({ success: false, message: 'Provide an email and a password of at least 12 characters.' });
  try {
    await (await db()).collection('admins').insertOne({ email, passwordHash: await bcrypt.hash(password, 12), role: 'admin', createdAt: new Date() });
    return res.json({ success: true, message: 'Administrator added.' });
  } catch (error) { return res.status(409).json({ success: false, message: error instanceof Error ? error.message : 'Could not add administrator.' }); }
});

app.post('/api/admin/upload', requireAdmin, async (req: Request, res: Response) => {
  if (!media) return res.status(503).json({ success: false, message: 'ImageKit is not configured.' });
  const { file, fileName } = req.body;
  if (typeof file !== 'string' || !file.startsWith('data:image/')) return res.status(400).json({ success: false, message: 'Upload an image file.' });
  try {
    const result = await media.upload({ file, fileName: String(fileName || `starmax-${Date.now()}.jpg`), folder: '/starmax' });
    return res.json({ success: true, data: { url: result.url, fileId: result.fileId } });
  } catch (error) { return res.status(502).json({ success: false, message: error instanceof Error ? error.message : 'Image upload failed.' }); }
});

// Basic rate limiting map for form submissions
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

function checkRateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a minute before submitting again.'
    });
  }

  entry.count += 1;
  next();
}

// API Routes
app.post('/api/callback', checkRateLimit, (req: Request, res: Response) => {
  const { fullName, phone, email, service, preferredTime, message } = req.body;

  if (!fullName || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Full Name and Phone Number are required.'
    });
  }

  void (async () => {
    const database = await db();
    const record = { fullName, phone, email, service, preferredTime, message, status: 'new', emailStatus: 'pending', createdAt: new Date() };
    const saved = await database.collection('callbacks').insertOne(record);
    const emailTo = process.env.ENQUIRY_EMAIL_TO || process.env.CONTACT_EMAIL_RECIPIENT;
    let emailStatus: 'sent' | 'failed' | 'not_configured' = 'not_configured';
    if (process.env.SMTP_HOST && emailTo) {
      const secure = process.env.SMTP_SECURE === 'true';
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || (secure ? 465 : 587)),
        secure,
        requireTLS: !secure,
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS } : undefined,
      });
      try {
        await transport.sendMail({
          from: process.env.ENQUIRY_EMAIL_FROM || process.env.SMTP_FROM || process.env.SMTP_USER,
          to: emailTo,
          replyTo: email || undefined,
          subject: `Website callback request: ${fullName}`,
          text: `A callback was requested from the Starmax Systems website.\n\nName: ${fullName}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nService: ${service || 'General enquiry'}\nPreferred time: ${preferredTime || 'Not specified'}\n\nMessage: ${message || 'No message provided'}`,
        });
        emailStatus = 'sent';
      } catch (mailError) {
        emailStatus = 'failed';
        console.error('[CALLBACK_EMAIL_FAILED]', mailError instanceof Error ? mailError.message : 'Unknown SMTP error');
      }
    } else {
      console.error('[CALLBACK_EMAIL_FAILED] SMTP_HOST and an enquiry recipient are required.');
    }
    await database.collection('callbacks').updateOne({ _id: saved.insertedId }, { $set: { emailStatus } });
    const emailNote = emailStatus === 'sent'
      ? ' Our team has also been notified by email.'
      : ' The request was saved, but the email notification could not be sent. Please call our office if you need an immediate response.';
    return res.json({ success: true, message: `Thank you, ${fullName}. Your callback request has been received.${emailNote}`, timestamp: record.createdAt.toISOString(), data: { emailStatus } });
  })().catch((error) => {
    console.error('[CALLBACK_SAVE_FAILED]', error instanceof Error ? error.message : 'Unknown database error');
    if (!res.headersSent) res.status(503).json({ success: false, message: 'We could not save your callback request. Please try again shortly.' });
  });
});

app.post('/api/contact', checkRateLimit, (req: Request, res: Response) => {
  const { fullName, email, phone, company, service, subject, message } = req.body;

  if (!fullName || !email || !phone || !subject || !message || req.body.consent !== true) {
    return res.status(400).json({
      success: false,
      message: 'Please complete all required fields.'
    });
  }

  void (async () => {
    const database = await db();
    const enquiry = { fullName, email, phone, company, service, subject, message, consent: Boolean(req.body.consent), status: 'new', createdAt: new Date() };
    await database.collection('enquiries').insertOne(enquiry);
    const emailTo = process.env.ENQUIRY_EMAIL_TO || process.env.CONTACT_EMAIL_RECIPIENT;
    if (process.env.SMTP_HOST && emailTo) {
      const secure = process.env.SMTP_SECURE === 'true';
      const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure, requireTLS: !secure, auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS } : undefined });
      try {
        await transport.sendMail({ from: process.env.ENQUIRY_EMAIL_FROM || process.env.SMTP_FROM || process.env.SMTP_USER, to: emailTo, replyTo: email, subject: `Website enquiry: ${subject}`, text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company || 'Not provided'}\nService: ${service}\n\n${message}` });
      } catch (mailError) { console.error('[ENQUIRY_EMAIL_FAILED]', mailError instanceof Error ? mailError.message : 'Unknown error'); }
    }
    res.json({ success: true, message: `Thank you, ${fullName}. Your message has been received by Starmax Systems.` });
  })().catch((error) => {
    console.error('[CONTACT_SUBMIT_FAILED]', error instanceof Error ? error.message : 'Unknown error');
    if (!res.headersSent) res.status(503).json({ success: false, message: 'We could not save your enquiry. Please try again shortly.' });
  });
});

app.post('/api/enquiry', checkRateLimit, (req: Request, res: Response) => {
  const { fullName, phone, email, company, service, location, message } = req.body;

  if (!fullName || !phone || !email || !service || !location) {
    return res.status(400).json({
      success: false,
      message: 'Please provide required contact and location information.'
    });
  }

  console.log('[SERVICE_ENQUIRY]', {
    timestamp: new Date().toISOString(),
    fullName,
    phone,
    email,
    company,
    service,
    location,
    message
  });

  return res.json({
    success: true,
    message: `Enquiry for ${service} at ${location} has been registered. Our technical team will follow up promptly.`,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/careers', checkRateLimit, parseCareerResume, async (req: Request, res: Response) => {
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(String(req.body.data || '{}')) as Record<string, unknown>;
  } catch {
    return res.status(400).json({ success: false, message: 'Application details were not in a valid format.' });
  }

  const resume = req.file;
  const fullName = String(data.fullName || '').trim();
  const email = String(data.email || '').trim();
  const educationalQualification = String(data.educationalQualification || '').trim();
  if (!resume) return res.status(400).json({ success: false, message: 'Attach your resume as a PDF, DOC, or DOCX file (maximum 5 MB).' });
  if (!fullName || !/^\S+@\S+\.\S+$/.test(email) || !educationalQualification || data.consent !== true) {
    return res.status(400).json({ success: false, message: 'Complete your name, valid email, educational qualification, and consent.' });
  }

  try {
    const database = await db();
    const now = new Date();
    const application = {
      fullName,
      email,
      educationalQualification,
      consent: true,
      resumeFileName: path.basename(resume.originalname),
      resume: { fileName: path.basename(resume.originalname), mimeType: resume.mimetype, size: resume.size, contents: resume.buffer },
      emailStatus: 'pending',
      createdAt: now,
    };
    const saved = await database.collection('careerApplications').insertOne(application);
    const recipient = process.env.CAREERS_EMAIL_TO || process.env.ENQUIRY_EMAIL_TO || process.env.CONTACT_EMAIL_RECIPIENT;
    let emailStatus: 'sent' | 'failed' | 'not_configured' = 'not_configured';

    if (process.env.SMTP_HOST && recipient) {
      const secure = process.env.SMTP_SECURE === 'true';
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || (secure ? 465 : 587)),
        secure,
        requireTLS: !secure,
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS } : undefined,
      });
      try {
        await transport.sendMail({
          from: process.env.ENQUIRY_EMAIL_FROM || process.env.SMTP_FROM || process.env.SMTP_USER,
          to: recipient,
          replyTo: email,
          subject: `Careers application: ${fullName}`,
          text: [
            'A new employment application was submitted through the Starmax Systems website.',
            '',
            `Full name: ${fullName}`,
            `Email: ${email}`,
            `Educational qualification: ${educationalQualification}`,
            `Resume: ${application.resume.fileName}`,
            '',
            'The candidate consented to processing their application information.',
          ].join('\n'),
          attachments: [{ filename: application.resume.fileName, content: resume.buffer, contentType: resume.mimetype }],
        });
        emailStatus = 'sent';
      } catch (mailError) {
        emailStatus = 'failed';
        console.error('[CAREER_EMAIL_FAILED]', mailError instanceof Error ? mailError.message : 'Unknown SMTP error');
      }
    } else {
      console.error('[CAREER_EMAIL_FAILED] SMTP_HOST and a careers recipient are required.');
    }

    await database.collection('careerApplications').updateOne({ _id: saved.insertedId }, { $set: { emailStatus } });
    const emailMessage = emailStatus === 'sent'
      ? 'The application was sent to our recruitment team with the CV attached.'
      : 'The application and CV were saved, but the recruitment email could not be sent. Please contact our office to confirm receipt.';
    return res.json({ success: true, message: `Thank you, ${fullName}. ${emailMessage}`, data: { emailStatus } });
  } catch (error) {
    console.error('[CAREER_APPLICATION_FAILED]', error instanceof Error ? error.message : 'Unknown database error');
    return res.status(503).json({ success: false, message: 'We could not securely save your application. Please try again shortly.' });
  }
});

async function startServer() {
  if (!isProduction) {
    // Mount Vite middleware in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const portNumber = Number(PORT) || 3000;
  app.listen(portNumber, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${portNumber}`);
  });
}

if (!process.env.VERCEL) startServer();

export default app;
