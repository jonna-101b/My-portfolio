import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root upload directory (Server/uploads)
const UPLOADS_ROOT = path.resolve(__dirname, '../../uploads');

/**
 * Returns the absolute path to the uploads directory or a sub-folder.
 * @param {string} [subDir=''] - Optional sub-directory (e.g., 'images', 'documents')
 * @returns {string} Absolute path
 */
export const getUploadDirectory = (subDir = '') => {
  if (subDir) {
    return path.join(UPLOADS_ROOT, subDir);
  }
  return UPLOADS_ROOT;
};

/**
 * Ensures the target upload directory exists, creating recursive parent directories if needed.
 * @param {string} [subDir=''] - Optional sub-directory
 * @returns {string} Absolute path of the ensured directory
 */
export const ensureUploadDirectory = (subDir = '') => {
  const targetDir = getUploadDirectory(subDir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  if (!subDir) {
    const imagesDir = getUploadDirectory('images');
    const docsDir = getUploadDirectory('documents');
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
    if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
  }
  return targetDir;
};

/**
 * Generates the relative web path for an uploaded file to be stored in DB.
 * @param {string} filename - Name of the saved file
 * @param {string} [subDir=''] - Optional sub-directory (e.g., 'images', 'documents')
 * @returns {string} e.g. '/uploads/images/abc-123.jpg'
 */
export const getRelativeFilePath = (filename, subDir = '') => {
  if (subDir) {
    return `/uploads/${subDir}/${filename}`;
  }
  return `/uploads/${filename}`;
};

/**
 * Deletes a local file given its relative or absolute path.
 * @param {string} fileRelativeOrAbsolutePath
 */
export const deleteUploadedFile = (fileRelativeOrAbsolutePath) => {
  if (!fileRelativeOrAbsolutePath) return;
  try {
    let absolutePath = fileRelativeOrAbsolutePath;
    if (fileRelativeOrAbsolutePath.startsWith('/uploads/')) {
      const relativePart = fileRelativeOrAbsolutePath.replace(/^\/uploads\//, '');
      absolutePath = path.join(UPLOADS_ROOT, relativePart);
    } else if (fileRelativeOrAbsolutePath.startsWith('uploads/')) {
      const relativePart = fileRelativeOrAbsolutePath.replace(/^uploads\//, '');
      absolutePath = path.join(UPLOADS_ROOT, relativePart);
    }

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (error) {
    console.error(`Failed to delete uploaded file: ${fileRelativeOrAbsolutePath}`, error);
  }
};
