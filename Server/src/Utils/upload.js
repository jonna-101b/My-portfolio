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
 * Safely deletes a local file from Server/uploads given a URL, relative path, or filename.
 * Handles:
 * - Full URLs: 'http://localhost:5000/uploads/images/xyz.jpg'
 * - Relative paths: '/uploads/images/xyz.jpg' or 'uploads/images/xyz.jpg'
 * - Windows paths: '\uploads\images\xyz.jpg' or 'uploads\images\xyz.jpg'
 * - Direct subDir paths: 'images/xyz.jpg' or 'documents/xyz.pdf'
 * - Objects with .url or .path
 * - Arrays of paths/objects
 * - Ignores external URLs (e.g. cloudinary, unsplash) not in /uploads/
 * - Protects against path traversal outside Server/uploads
 * 
 * @param {string|object|Array} fileSource - Path, URL, object, or array of paths/objects
 * @returns {boolean} Whether file(s) were successfully deleted
 */
export const deleteUploadedFile = (fileSource) => {
  if (!fileSource) return false;

  // If array, recursively delete each item
  if (Array.isArray(fileSource)) {
    let allDeleted = true;
    for (const item of fileSource) {
      const res = deleteUploadedFile(item);
      if (!res) allDeleted = false;
    }
    return allDeleted;
  }

  // If object, extract url, path, or preview
  let pathStr = fileSource;
  if (typeof fileSource === 'object' && fileSource !== null) {
    pathStr = fileSource.url || fileSource.path || fileSource.preview || '';
  }

  if (typeof pathStr !== 'string' || !pathStr.trim()) {
    return false;
  }

  pathStr = pathStr.trim();

  // If full URL, parse pathname
  if (pathStr.startsWith('http://') || pathStr.startsWith('https://')) {
    try {
      const parsedUrl = new URL(pathStr);
      pathStr = parsedUrl.pathname;
    } catch {
      pathStr = pathStr.replace(/^https?:\/\/[^\/]+/, '');
    }
  }

  // Strip query parameters and hash
  pathStr = pathStr.split('?')[0].split('#')[0];

  // Normalize slashes (convert backslashes to forward slashes)
  pathStr = pathStr.replace(/\\/g, '/');

  let relativePart = null;

  if (pathStr.includes('/uploads/')) {
    relativePart = pathStr.substring(pathStr.indexOf('/uploads/') + '/uploads/'.length);
  } else if (pathStr.startsWith('uploads/')) {
    relativePart = pathStr.substring('uploads/'.length);
  } else if (
    pathStr.startsWith('/images/') ||
    pathStr.startsWith('images/') ||
    pathStr.startsWith('/documents/') ||
    pathStr.startsWith('documents/')
  ) {
    relativePart = pathStr.replace(/^\//, '');
  }

  // If not pointing to an uploads directory path, safely ignore
  if (!relativePart) {
    return false;
  }

  try {
    relativePart = decodeURIComponent(relativePart);
  } catch {
    // Keep raw relative part
  }

  const absolutePath = path.resolve(UPLOADS_ROOT, relativePart);

  // Security check: Ensure target path is strictly within UPLOADS_ROOT
  const normalizedRoot = path.resolve(UPLOADS_ROOT);
  if (!absolutePath.startsWith(normalizedRoot) || absolutePath === normalizedRoot) {
    console.warn(`Blocked attempt to delete file outside uploads directory: ${absolutePath}`);
    return false;
  }

  try {
    if (fs.existsSync(absolutePath)) {
      const stats = fs.statSync(absolutePath);
      if (stats.isFile()) {
        fs.unlinkSync(absolutePath);
        console.log(`Successfully deleted uploaded file: ${absolutePath}`);
        return true;
      }
    }
  } catch (error) {
    console.error(`Failed to delete uploaded file at ${absolutePath}:`, error.message);
  }

  return false;
};

export const deleteUploadedFiles = deleteUploadedFile;

/**
 * Compares previous file value(s) with new file value(s) and deletes any old files that are no longer present.
 * 
 * @param {string|Array} oldVal - Previous file path/URL or array
 * @param {string|Array} newVal - New file path/URL or array
 */
export const deleteReplacedFiles = (oldVal, newVal) => {
  const extractUrls = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val
        .map((item) => (typeof item === 'object' && item !== null ? item.url || item.path || '' : item))
        .filter((item) => typeof item === 'string' && item.trim().length > 0);
    }
    if (typeof val === 'object' && val !== null) {
      const u = val.url || val.path || '';
      return typeof u === 'string' && u.trim().length > 0 ? [u] : [];
    }
    if (typeof val === 'string' && val.trim().length > 0) {
      return [val.trim()];
    }
    return [];
  };

  const oldList = extractUrls(oldVal);
  const newList = extractUrls(newVal);

  for (const oldFile of oldList) {
    if (!newList.includes(oldFile)) {
      deleteUploadedFile(oldFile);
    }
  }
};
