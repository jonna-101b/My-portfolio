import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import { ensureUploadDirectory, getUploadDirectory } from '../Utils/upload.js';
import { APIError } from '../Errors/APIError.js';

export const IMAGE_ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/svg',
  'image/avif',
  'image/bmp',
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'image/pjpeg',
  'image/x-png',
];

export const DOCUMENT_ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

export const ALL_ALLOWED_TYPES = [
  ...IMAGE_ALLOWED_TYPES,
  ...DOCUMENT_ALLOWED_TYPES,
];

/**
 * Determine sub-directory based on file MIME type if not explicitly set
 */
export const resolveSubDir = (file, explicitSubDir) => {
  if (explicitSubDir) return explicitSubDir;
  if (!file) return '';
  if (IMAGE_ALLOWED_TYPES.includes(file.mimetype) || (file.mimetype && file.mimetype.startsWith('image/'))) {
    return 'images';
  }
  if (DOCUMENT_ALLOWED_TYPES.includes(file.mimetype)) {
    return 'documents';
  }
  return '';
};

/**
 * Multer in-memory storage engine for streaming uploads to Cloudinary
 */
const createStorage = () => {
  return multer.memoryStorage();
};

/**
 * File filter callback
 */
const createFileFilter = (allowedTypes) => {
  return (req, file, cb) => {
    if (!allowedTypes || allowedTypes.length === 0) {
      cb(null, true);
      return;
    }

    if (
      allowedTypes.includes(file.mimetype) ||
      ((allowedTypes === IMAGE_ALLOWED_TYPES || allowedTypes === ALL_ALLOWED_TYPES) && file.mimetype && file.mimetype.startsWith('image/'))
    ) {
      cb(null, true);
      return;
    }

    cb(
      APIError.badRequest(
        `Invalid file type "${file.mimetype}". Allowed types: ${allowedTypes.join(', ')}`
      )
    );
  };
};

/**
 * Creates a Multer instance with standard configuration
 */
export const createUploadMiddleware = (options = {}) => {
  const {
    allowedTypes = ALL_ALLOWED_TYPES,
    maxFileSize = 10 * 1024 * 1024, // default 10MB
  } = options;

  const upload = multer({
    storage: createStorage(),
    fileFilter: createFileFilter(allowedTypes),
    limits: {
      fileSize: maxFileSize,
    },
  });

  return upload;
};

/**
 * Error-wrapping middleware for single file upload
 * Handles multer limit errors and converts them to standard APIError
 */
export const handleSingleUpload = (multerUpload, fieldName = 'file', subDir = '') => {
  return (req, res, next) => {
    const uploadHandler = multerUpload.single(fieldName);

    uploadHandler(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(APIError.badRequest(`File too large. Maximum size allowed is exceeded.`));
          }
          return next(APIError.badRequest(`Upload error: ${err.message}`));
        }
        return next(err);
      }

      if (req.file) {
        req.file.subDir = resolveSubDir(req.file, subDir);
      }

      next();
    });
  };
};

// Pre-configured middlewares
export const uploadImageMiddleware = (fieldName = 'image') =>
  handleSingleUpload(
    createUploadMiddleware({
      allowedTypes: IMAGE_ALLOWED_TYPES,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    }),
    fieldName,
    'images'
  );

export const uploadDocumentMiddleware = (fieldName = 'file') =>
  handleSingleUpload(
    createUploadMiddleware({
      allowedTypes: DOCUMENT_ALLOWED_TYPES,
      maxFileSize: 15 * 1024 * 1024, // 15MB
    }),
    fieldName,
    'documents'
  );

export const uploadAnyMiddleware = (fieldName = 'file') =>
  handleSingleUpload(
    createUploadMiddleware({
      allowedTypes: ALL_ALLOWED_TYPES,
      maxFileSize: 15 * 1024 * 1024, // 15MB
    }),
    fieldName
  );
