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
const resolveSubDir = (file, explicitSubDir) => {
  if (explicitSubDir) return explicitSubDir;
  if (IMAGE_ALLOWED_TYPES.includes(file.mimetype)) {
    return 'images';
  }
  if (DOCUMENT_ALLOWED_TYPES.includes(file.mimetype)) {
    return 'documents';
  }
  return '';
};

/**
 * Create custom disk storage engine with directory and unique UUID naming
 */
const createStorage = (defaultSubDir = '') => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const subDir = resolveSubDir(file, defaultSubDir);
      file.subDir = subDir; // attach to file object for downstream controller use
      const targetDir = ensureUploadDirectory(subDir);
      cb(null, targetDir);
    },

    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const uniqueFilename = `${randomUUID()}${fileExtension}`;
      cb(null, uniqueFilename);
    },
  });
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

    if (allowedTypes.includes(file.mimetype)) {
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
    subDir = '',
  } = options;

  const upload = multer({
    storage: createStorage(subDir),
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
export const handleSingleUpload = (multerUpload, fieldName = 'file') => {
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
      subDir: 'images',
    }),
    fieldName
  );

export const uploadDocumentMiddleware = (fieldName = 'file') =>
  handleSingleUpload(
    createUploadMiddleware({
      allowedTypes: DOCUMENT_ALLOWED_TYPES,
      maxFileSize: 15 * 1024 * 1024, // 15MB
      subDir: 'documents',
    }),
    fieldName
  );

export const uploadAnyMiddleware = (fieldName = 'file') =>
  handleSingleUpload(
    createUploadMiddleware({
      allowedTypes: ALL_ALLOWED_TYPES,
      maxFileSize: 15 * 1024 * 1024, // 15MB
    }),
    fieldName
  );
