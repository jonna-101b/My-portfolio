import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { config } from './Config/environments.js';
import { connectDB } from './Config/mongoose.js';
import router from './Config/routes.js';
import { Resend } from 'resend';
import { globalErrorHandler } from './Middleware/globalErrorHandler.js';
import { apiLimiter } from './Middleware/rateLimiters.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { ensureUploadDirectory } from './Utils/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure base upload directories exist
try {
  ensureUploadDirectory('images');
  ensureUploadDirectory('documents');
} catch (err) {
  console.warn('Warning: Could not create upload directories:', err.message);
}

const app = express();
export const resend = new Resend(config.resendApiKey);

// Trust proxy for Render reverse proxy (required for correct client IP & SameSite=None Secure cookies)
app.set('trust proxy', 1);

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allows client to load static assets from /uploads
  })
);

// CORS configuration supporting production FRONTEND_URL, Vercel preview URLs, and dev localhost
const allowedOrigins = [
  config.frontendUrl,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
].filter(Boolean);

const parsedAllowedOrigins = allowedOrigins.flatMap((orig) => orig.split(',').map((o) => o.trim()));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (server-to-server, curl, Render health probes, etc.)
      if (!origin) return callback(null, true);

      // Check explicitly configured origins
      if (parsedAllowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow Vercel preview deployments (*.vercel.app) or all in development
      try {
        const hostname = new URL(origin).hostname;
        if (hostname.endsWith('.vercel.app') || config.env !== 'production') {
          return callback(null, true);
        }
      } catch {
        // Fall through to reject
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 204,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Lightweight health check route for Render (GET /health)
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = ['disconnected', 'connected', 'connecting', 'disconnecting'][dbState] || 'unknown';
  res.status(200).json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: dbStatus,
    environment: config.env,
  });
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// General API Rate Limiting & Routes
app.use('/api', apiLimiter, router);

app.use(globalErrorHandler);

// Server listening
const startServer = async () => {
  await connectDB();

  const server = app.listen(config.port, '0.0.0.0', () => {
    console.log(`Server running in ${config.env} mode on port ${config.port} bound to 0.0.0.0`);
  });

  // Handle termination signals gracefully
  const shutdown = () => {
    console.log('Received shutdown signal, closing server gracefully...');
    server.close(async () => {
      console.log('HTTP server closed.');
      await mongoose.connection.close(false);
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();