import { APIError } from '../Errors/APIError.js';
import { getRelativeFilePath } from '../Utils/upload.js';

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
