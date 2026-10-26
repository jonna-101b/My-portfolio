import path from 'path';
import { randomUUID } from 'crypto';
import cloudinary from '../Config/cloudinary.js';

/**
 * Checks whether a given string is a Cloudinary URL
 * @param {string} url
 * @returns {boolean}
 */
export const isCloudinaryUrl = (url) => {
  return typeof url === 'string' && url.includes('res.cloudinary.com');
};

/**
 * Parses a Cloudinary delivery URL into components (cloudName, resourceType, publicId)
 * Handles URLs with or without version tags, transformations, and extensions.
 *
 * Examples:
 *   https://res.cloudinary.com/demo/image/upload/v1234567890/portfolio/images/sample.jpg
 *   https://res.cloudinary.com/demo/raw/upload/v1234567890/portfolio/documents/resume.pdf
 *   https://res.cloudinary.com/demo/image/upload/c_fill,w_300/sample.png
 *
 * @param {string} url
 * @returns {{ cloudName: string, resourceType: string, publicId: string, originalWithExt: string } | null}
 */
export const parseCloudinaryUrl = (url) => {
  if (!isCloudinaryUrl(url)) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname; // e.g. /cloud_name/image/upload/v12345/portfolio/images/sample.jpg

    const parts = pathname.split('/').filter(Boolean);
    if (parts.length < 4) return null;

    const cloudName = parts[0];
    const resourceType = parts[1]; // 'image', 'raw', 'video'
    const deliveryType = parts[2]; // 'upload', etc.

    const remainingParts = parts.slice(3);

    // Find where the version or public_id starts
    let startIndex = 0;
    for (let i = 0; i < remainingParts.length; i++) {
      const seg = remainingParts[i];
      // If segment is version (e.g. v1234567890)
      if (/^v\d+$/.test(seg)) {
        startIndex = i + 1;
        break;
      }
      // If segment looks like a transformation (contains comma or transform key prefix)
      if (seg.includes(',') || /^(c|w|h|q|f|fl|e|b|r|a|t|co|pg|dn|so|eo|du|fps|af|ar|l|u)_[a-zA-Z0-9_-]+/.test(seg)) {
        continue;
      }
      // If neither transformation nor version, public_id starts here
      startIndex = i;
      break;
    }

    const publicIdParts = remainingParts.slice(startIndex);
    const publicIdWithExt = publicIdParts.join('/');
    let publicId = publicIdWithExt;

    // For 'image' resource_type, Cloudinary stores public_id without the file extension
    if (resourceType === 'image') {
      publicId = publicId.replace(/\.[a-zA-Z0-9]+$/, '');
    }

    return {
      cloudName,
      resourceType,
      publicId,
      originalWithExt: publicIdWithExt,
    };
  } catch (error) {
    console.error('Error parsing Cloudinary URL:', error.message);
    return null;
  }
};

/**
 * Uploads an in-memory Buffer to Cloudinary using upload_stream
 *
 * @param {Buffer} buffer - File buffer from Multer memory storage
 * @param {object} options - Cloudinary upload options (folder, resource_type, filename, etc.)
 * @returns {Promise<object>} Cloudinary upload result
 */
export const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!Buffer.isBuffer(buffer)) {
      return reject(new Error('Invalid buffer provided for Cloudinary upload.'));
    }

    const {
      folder = 'portfolio',
      resource_type = 'auto',
      filename,
      ...restOptions
    } = options;

    const uploadOptions = {
      folder,
      resource_type,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      ...restOptions,
    };

    if (filename && !uploadOptions.public_id) {
      const cleanBaseName = path.parse(filename).name.replace(/[^a-zA-Z0-9_-]/g, '_');
      uploadOptions.public_id = `${cleanBaseName}-${randomUUID().slice(0, 8)}`;
    }

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload_stream error:', error);
          return reject(error);
        }
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

/**
 * Versatile helper to upload a file (Multer memory file, Buffer, base64 data URI, or URL)
 * to Cloudinary and return the result with secure_url.
 *
 * @param {object|Buffer|string} source - Multer file object, Buffer, or base64 data URI
 * @param {object} [options={}] - Optional upload configurations
 * @returns {Promise<object|null>}
 */
export const uploadToCloudinary = async (source, options = {}) => {
  if (!source) return null;

  // 1. If it's already a Cloudinary URL, keep as is
  if (typeof source === 'string' && isCloudinaryUrl(source)) {
    return {
      secure_url: source,
      url: source,
    };
  }

  // 2. Multer file object from memoryStorage
  if (typeof source === 'object' && source !== null && source.buffer) {
    const isImage = source.mimetype?.startsWith('image/') || source.subDir === 'images';
    const subDir = source.subDir || (isImage ? 'images' : 'documents');
    const folder = options.folder || `portfolio/${subDir}`;
    const resource_type = options.resource_type || (isImage ? 'image' : 'auto');

    return await uploadBufferToCloudinary(source.buffer, {
      folder,
      resource_type,
      filename: source.originalname,
      ...options,
    });
  }

  // 3. Raw Buffer
  if (Buffer.isBuffer(source)) {
    return await uploadBufferToCloudinary(source, options);
  }

  // 4. Base64 data URI or remote image URL
  if (typeof source === 'string') {
    const trimmed = source.trim();
    const isDataUri = trimmed.startsWith('data:');
    const isHttpUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://');

    if (isDataUri || isHttpUrl) {
      const isDocument = trimmed.startsWith('data:application/') || trimmed.startsWith('data:text/');
      const subDir = isDocument ? 'documents' : 'images';
      const folder = options.folder || `portfolio/${subDir}`;
      const resource_type = options.resource_type || (isDocument ? 'raw' : 'auto');

      const result = await cloudinary.uploader.upload(trimmed, {
        folder,
        resource_type,
        use_filename: true,
        unique_filename: true,
        ...options,
      });

      return result;
    }
  }

  return null;
};

/**
 * Safely deletes an asset from Cloudinary given a public_id or full Cloudinary URL
 *
 * @param {string} publicIdOrUrl - Cloudinary public ID or secure URL
 * @param {object} [options={}] - Options (e.g. resourceType)
 * @returns {Promise<boolean>} Whether deletion succeeded
 */
export const deleteFromCloudinary = async (publicIdOrUrl, options = {}) => {
  if (!publicIdOrUrl || typeof publicIdOrUrl !== 'string') {
    return false;
  }

  const trimmed = publicIdOrUrl.trim();
  if (!trimmed) return false;

  let publicId = trimmed;
  let resourceType = options.resourceType || 'image';

  if (isCloudinaryUrl(trimmed)) {
    const parsed = parseCloudinaryUrl(trimmed);
    if (parsed) {
      publicId = parsed.publicId;
      resourceType = options.resourceType || parsed.resourceType;
    }
  }

  try {
    // Attempt deletion with identified resource type
    let result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });

    if (result.result === 'ok') {
      console.log(`Successfully deleted from Cloudinary (${resourceType}): ${publicId}`);
      return true;
    }

    // If not found with detected resourceType and user didn't specify one, try alternative resource type
    if (result.result !== 'ok' && !options.resourceType) {
      const altType = resourceType === 'image' ? 'raw' : 'image';
      const altPublicId = altType === 'raw' && !publicId.includes('.') ? `${publicId}.pdf` : publicId.replace(/\.[^.]+$/, '');

      const retryResult = await cloudinary.uploader.destroy(altPublicId, {
        resource_type: altType,
        invalidate: true,
      });

      if (retryResult.result === 'ok') {
        console.log(`Successfully deleted from Cloudinary on retry (${altType}): ${altPublicId}`);
        return true;
      }
    }

    if (result.result === 'not found') {
      console.log(`Cloudinary asset not found (already deleted): ${publicId}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Failed to delete asset from Cloudinary (${publicId}):`, error.message);
    return false;
  }
};

export default {
  isCloudinaryUrl,
  parseCloudinaryUrl,
  uploadBufferToCloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
};
