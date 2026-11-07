import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { MongoClient, ObjectId, type Document } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ImageKit from 'imagekit';
import multer from 'multer';

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
function filterGpsGalleryItems(items: Document[]): Document[] {
  return items.filter((item) => {
    const galleryText = [item.title, item.caption, item.image]
      .filter((value): value is string => typeof value === 'string')
      .join(' ');
    return item.id !== 'g-6' && !/\b(gps|fleet|telematics|vehicle\s+tracking)\b/i.test(galleryText);
  });
}
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
    const visibleItems = req.params.type === 'gallery' ? filterGpsGalleryItems(items) : items;
    return res.json({
      success: true,
      data: visibleItems.map(({ _id, ...item }) => ({
        ...item,
        ...(req.params.type === 'gallery' && item.category === 'tracking'
          ? { category: 'automation', categoryLabel: 'Home Automation' }
          : {}),
        id: String(item.id || _id),
      })),
    });
  } catch (error) { return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Content unavailable.' }); }
});

app.get('/api/admin/content/:type', requireAdmin, async (req: Request, res: Response) => {
  if (!collections.includes(req.params.type as typeof collections[number])) return res.status(404).json({ success: false, message: 'Unknown content type.' });
  try {
    const items = await (await db()).collection(req.params.type).find().sort({ order: 1, _id: 1 }).toArray();
    const visibleItems = req.params.type === 'gallery' ? filterGpsGalleryItems(items) : items;
    return res.json({
      success: true,
      data: visibleItems.map(({ _id, ...item }) => ({
        ...item,
        ...(req.params.type === 'gallery' && item.category === 'tracking' ? { category: 'automation', categoryLabel: 'Home Automation' } : {}),
        id: String(item.id || _id),
      })),
    });
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

app.get('/api/admin/admins', requireAdmin, async (req: Request, res: Response) => {
  if ((req as Request & { admin?: jwt.JwtPayload }).admin?.role !== 'owner') {
    return res.status(403).json({ success: false, message: 'Only the owner can view administrators.' });
  }
  try {
    const admins = await (await db()).collection('admins')
      .find({}, { projection: { email: 1, role: 1, createdAt: 1 } })
      .sort({ createdAt: 1, _id: 1 })
      .toArray();
    return res.json({
      success: true,
      data: admins.map(({ _id, ...admin }) => ({ ...admin, id: String(_id) })),
    });
  } catch (error) {
    return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Administrators unavailable.' });
  }
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
      const source = kind === 'Enquiry' ? 'enquiries' : kind === 'Callback request' ? 'callbacks' : 'careerApplications';
      const validStatuses = ['new', 'open', 'in-progress', 'closed'];
      const status = validStatuses.includes(String(item.status)) ? String(item.status) : 'new';
      return { ...item, kind, source, status, id: String(_id) };
    });
    return res.json({ success: true, data });
  } catch (error) { return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Inbox unavailable.' }); }
});

app.patch('/api/admin/enquiries/:source/:id', requireAdmin, async (req: Request, res: Response) => {
  const allowedSources = ['enquiries', 'callbacks', 'careerApplications'];
  const status = req.body.status;
  if (!allowedSources.includes(req.params.source)) return res.status(404).json({ success: false, message: 'Unknown request type.' });
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid request ID.' });
  if (!['new', 'open', 'in-progress', 'closed'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Choose a valid request status.' });
  }
  try {
    const result = await (await db()).collection(req.params.source).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status, updatedAt: new Date() } },
    );
    if (!result.matchedCount) return res.status(404).json({ success: false, message: 'Request not found.' });
    return res.json({ success: true, message: `Request marked ${status}.` });
  } catch (error) {
    return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Could not update request status.' });
  }
});

app.delete('/api/admin/enquiries/:source/:id', requireAdmin, async (req: Request, res: Response) => {
  const allowedSources = ['enquiries', 'callbacks', 'careerApplications'];
  if (!allowedSources.includes(req.params.source)) return res.status(404).json({ success: false, message: 'Unknown request type.' });
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid request ID.' });
  try {
    const result = await (await db()).collection(req.params.source).deleteOne({ _id: new ObjectId(req.params.id) });
    if (!result.deletedCount) return res.status(404).json({ success: false, message: 'Request not found.' });
    return res.json({ success: true, message: 'Request deleted.' });
  } catch (error) {
    return res.status(503).json({ success: false, message: error instanceof Error ? error.message : 'Could not delete request.' });
  }
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
  if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 12) {
    return res.status(400).json({ success: false, message: 'Provide a valid email and a password of at least 12 characters.' });
  }
  try {
    await (await db()).collection('admins').insertOne({ email, passwordHash: await bcrypt.hash(password, 12), role: 'admin', createdAt: new Date() });
    return res.json({ success: true, message: 'Administrator added.' });
  } catch (error) { return res.status(409).json({ success: false, message: error instanceof Error ? error.message : 'Could not add administrator.' }); }
});

app.post('/api/admin/upload', requireAdmin, async (req: Request, res: Response) => {
  if (!media) return res.status(503).json({ success: false, message: 'ImageKit is not configured.' });
  const { file, fileName } = req.body;
  const imageMatch = typeof file === 'string'
    ? /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/]+={0,2})$/.exec(file)
    : null;
  if (!imageMatch) return res.status(400).json({ success: false, message: 'Upload a JPG, PNG, or WebP image.' });
  if (Buffer.from(imageMatch[2], 'base64').byteLength > 7 * 1024 * 1024) {
    return res.status(413).json({ success: false, message: 'Images must be 7 MB or smaller.' });
  }
  try {
    const safeFileName = path.basename(String(fileName || `starmax-${Date.now()}`)).replace(/[^\w.-]/g, '_');
    const result = await media.upload({ file, fileName: safeFileName, folder: '/starmax' });
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
app.post('/api/callback', checkRateLimit, async (req: Request, res: Response) => {
  const { fullName, phone, email, service, preferredTime, message, consent } = req.body;
  if (!fullName || !phone || !email || !service || !preferredTime || consent !== true) {
    return res.status(400).json({
      success: false,
      message: 'Please complete all required fields and provide consent.'
    });
  }

  try {
    const database = await db();
    const createdAt = new Date();
    const normalizedName = String(fullName).trim();
    await database.collection('callbacks').insertOne({
      fullName: normalizedName,
      phone: String(phone).trim(),
      email: String(email).trim(),
      service: String(service).trim(),
      preferredTime: String(preferredTime).trim(),
      message: message ? String(message).trim() : '',
      consent: true,
      status: 'new',
      createdAt,
    });
    return res.json({
      success: true,
      message: `Thank you, ${normalizedName}. Your callback request has been received.`,
      timestamp: createdAt.toISOString(),
    });
  } catch (error) {
    console.error('[CALLBACK_SAVE_FAILED]', error instanceof Error ? error.message : 'Unknown database error');
    if (!res.headersSent) res.status(503).json({ success: false, message: 'We could not save your callback request. Please try again shortly.' });
  }
});

app.post('/api/contact', checkRateLimit, async (req: Request, res: Response) => {
  const { fullName, email, phone, company, service, subject, message } = req.body;

  if (!fullName || !email || !phone || !subject || !message || req.body.consent !== true) {
    return res.status(400).json({
      success: false,
      message: 'Please complete all required fields.'
    });
  }

  try {
    const database = await db();
    const enquiry = {
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      company: company ? String(company).trim() : '',
      service: service ? String(service).trim() : '',
      subject: String(subject).trim(),
      message: String(message).trim(),
      consent: true,
      status: 'new',
      createdAt: new Date(),
    };
    await database.collection('enquiries').insertOne(enquiry);
    return res.json({ success: true, message: `Thank you, ${enquiry.fullName}. Your message has been received by Starmax Systems.` });
  } catch (error) {
    console.error('[CONTACT_SUBMIT_FAILED]', error instanceof Error ? error.message : 'Unknown error');
    if (!res.headersSent) res.status(503).json({ success: false, message: 'We could not save your enquiry. Please try again shortly.' });
  }
});

app.post('/api/enquiry', checkRateLimit, async (req: Request, res: Response) => {
  const { fullName, phone, email, company, service, location, message, consent } = req.body;

  if (!fullName || !phone || !email || !service || !location || consent !== true) {
    return res.status(400).json({
      success: false,
      message: 'Please provide required contact, location, and consent information.'
    });
  }

  try {
    const createdAt = new Date();
    await (await db()).collection('enquiries').insertOne({
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      company: company ? String(company).trim() : '',
      service: String(service).trim(),
      location: String(location).trim(),
      message: message ? String(message).trim() : '',
      consent: true,
      status: 'new',
      createdAt,
    });
    return res.json({
      success: true,
      message: `Enquiry for ${service} at ${location} has been registered. Our technical team will follow up promptly.`,
      timestamp: createdAt.toISOString(),
    });
  } catch (error) {
    console.error('[SERVICE_ENQUIRY_SAVE_FAILED]', error instanceof Error ? error.message : 'Unknown database error');
    return res.status(503).json({ success: false, message: 'We could not save your enquiry. Please try again shortly.' });
  }
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
      createdAt: now,
    };
    await database.collection('careerApplications').insertOne(application);
    return res.json({ success: true, message: `Thank you, ${fullName}. Your application has been saved.` });
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
    console.log(`Server running at http://localhost:${portNumber}`);
  });
}

if (!process.env.VERCEL) startServer();

export default app;
