import { APIError } from '../Errors/APIError.js';
import { uploadToCloudinary, deleteUploadedFile } from '../Utils/upload.js';

/**
 * Controller to handle single uploaded file response via Cloudinary
 */
export const uploadSingleFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(APIError.badRequest('No file uploaded or file field missing.'));
    }

    const subDir = req.file.subDir || (req.file.mimetype?.startsWith('image/') ? 'images' : 'documents');
    const folder = subDir ? `portfolio/${subDir}` : 'portfolio';

    // Upload memory buffer to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file, { folder });

    if (!uploadResult || !uploadResult.secure_url) {
      return next(APIError.internal('Failed to upload file to Cloudinary.'));
    }

    res.status(201).json({
      success: true,
      url: uploadResult.secure_url,
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      filename: uploadResult.original_filename || req.file.originalname,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size || uploadResult.bytes,
      format: uploadResult.format,
      subDir: subDir,
    });
  } catch (error) {
    console.error('File upload to Cloudinary failed:', error);
    next(APIError.badRequest(error.message || 'File upload failed.'));
  }
};

/**
 * Controller to delete an uploaded file from Cloudinary or Server/uploads
 */
export const deleteFile = async (req, res, next) => {
  try {
    const { url, path: filePath, file, public_id } = req.body || {};
    const target = public_id || url || filePath || file || req.query.url;

    if (!target) {
      return next(APIError.badRequest('No file URL or path provided for deletion.'));
    }

    const deleted = await deleteUploadedFile(target);

    res.status(200).json({
      success: true,
      deleted: Boolean(deleted),
      message: deleted ? 'File deleted successfully.' : 'File was not found or already deleted.',
    });
  } catch (error) {
    next(error);
  }
};
