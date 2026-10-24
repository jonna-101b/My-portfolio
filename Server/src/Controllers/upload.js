import { APIError } from '../Errors/APIError.js';
import { getRelativeFilePath, deleteUploadedFile } from '../Utils/upload.js';

/**
 * Controller to handle single uploaded file response
 */
export const uploadSingleFile = (req, res, next) => {
  try {
    if (!req.file) {
      return next(APIError.badRequest('No file uploaded or file field missing.'));
    }

    const subDir = req.file.subDir || '';
    const relativePath = getRelativeFilePath(req.file.filename, subDir);

    res.status(201).json({
      success: true,
      url: relativePath,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      subDir: subDir,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete an uploaded file from Server/uploads
 */
export const deleteFile = (req, res, next) => {
  try {
    const { url, path: filePath, file } = req.body || {};
    const target = url || filePath || file || req.query.url;

    if (!target) {
      return next(APIError.badRequest('No file URL or path provided for deletion.'));
    }

    const deleted = deleteUploadedFile(target);

    res.status(200).json({
      success: true,
      deleted,
      message: deleted ? 'File deleted successfully.' : 'File was not found or already deleted.',
    });
  } catch (error) {
    next(error);
  }
};
