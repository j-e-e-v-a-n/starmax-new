import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

  console.log('[CALLBACK_REQUEST]', {
    timestamp: new Date().toISOString(),
    fullName,
    phone,
    email,
    service,
    preferredTime,
    message
  });

  return res.json({
    success: true,
    message: `Thank you, ${fullName}. Your callback request for ${service || 'security systems'} has been logged. Our Kadavanthra office will contact you at ${phone}.`,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/contact', checkRateLimit, (req: Request, res: Response) => {
  const { fullName, email, phone, company, service, subject, message } = req.body;

  if (!fullName || !email || !phone || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please complete all required fields.'
    });
  }

  console.log('[CONTACT_MESSAGE]', {
    timestamp: new Date().toISOString(),
    fullName,
    email,
    phone,
    company,
    service,
    subject,
    message
  });

  return res.json({
    success: true,
    message: `Thank you, ${fullName}. Your message regarding "${subject}" has been successfully dispatched to Starmax Systems.`,
    timestamp: new Date().toISOString()
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

app.post('/api/careers', checkRateLimit, (req: Request, res: Response) => {
  console.log('[CAREER_APPLICATION]', {
    timestamp: new Date().toISOString(),
    body: req.body
  });

  return res.json({
    success: true,
    message: 'Candidate application received and securely registered for evaluation.',
    timestamp: new Date().toISOString()
  });
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

startServer();
