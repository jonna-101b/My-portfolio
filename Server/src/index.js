import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './Config/environments.js';
import { connectDB } from './Config/mongoose.js';
import router from './Config/routes.js';
import { Resend } from 'resend';
import { globalErrorHandler } from './Middleware/globalErrorHandler.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { ensureUploadDirectory } from './Utils/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure base upload directories exist
ensureUploadDirectory('images');
ensureUploadDirectory('documents');

const app = express();
export const resend = new Resend(config.resendApiKey);

app.use(
  cors({
    origin: 'http://localhost:5173', // Your React/Vite dev server URL
    credentials: true,               // Crucial for HttpOnly cookies / headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(cookieParser());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use("/api", router);

app.use(globalErrorHandler);

// Server listening
const startServer = async () => {
    await connectDB();

    app.listen(config.port, () => {
        console.log(`Server running in ${config.env} mode on port ${config.port}`);
    });
};

startServer();