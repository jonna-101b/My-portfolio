import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import {
  createUploadMiddleware,
  IMAGE_ALLOWED_TYPES,
  DOCUMENT_ALLOWED_TYPES,
  ALL_ALLOWED_TYPES,
} from '../Middleware/upload.js';
import { uploadSingleFile } from '../Controllers/upload.js';
import { APIError } from '../Errors/APIError.js';
import multer from 'multer';

const uploadRouter = express.Router();

/**
 * Flexible middleware that accepts any single file with common field names
 */
const createFlexibleUploadHandler = (options) => {
  const upload = createUploadMiddleware(options);
  // Accept any of these field names
  const fields = [
    { name: 'file', maxCount: 1 },
    { name: 'image', maxCount: 1 },
    { name: 'picture', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'document', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ];

  return (req, res, next) => {
    upload.fields(fields)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(APIError.badRequest('File too large. Exceeds size limit.'));
          }
          return next(APIError.badRequest(`Upload error: ${err.message}`));
        }
        return next(err);
      }

      // Find the first uploaded file from any accepted field name and set to req.file
      if (req.files) {
        for (const field of fields) {
          if (req.files[field.name] && req.files[field.name].length > 0) {
            req.file = req.files[field.name][0];
            break;
          }
        }
      }

      next();
    });
  };
};

const imageUpload = createFlexibleUploadHandler({
  allowedTypes: IMAGE_ALLOWED_TYPES,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  subDir: 'images',
});

const documentUpload = createFlexibleUploadHandler({
  allowedTypes: DOCUMENT_ALLOWED_TYPES,
  maxFileSize: 15 * 1024 * 1024, // 15MB
  subDir: 'documents',
});

const anyUpload = createFlexibleUploadHandler({
  allowedTypes: ALL_ALLOWED_TYPES,
  maxFileSize: 15 * 1024 * 1024, // 15MB
});

// Routes
uploadRouter.post('/image', authenticate, imageUpload, uploadSingleFile);
uploadRouter.post('/document', authenticate, documentUpload, uploadSingleFile);
uploadRouter.post('/', authenticate, anyUpload, uploadSingleFile);

export default uploadRouter;
