import { body, param } from 'express-validator';
import parseValidationErrors from './errorParser.js';

const blogFields = [
  body('author').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Author must be between 2 and 100 characters'),
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('intro').trim().notEmpty().withMessage('Intro is required').isLength({ min: 10, max: 500 }).withMessage('Intro must be between 10 and 500 characters'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ min: 20, max: 20000 }).withMessage('Description must be between 20 and 20000 characters'),
  body('datePublished').optional().isISO8601().toDate().withMessage('datePublished must be a valid ISO 8601 date'),
  body('tags').optional().isArray({ max: 20 }).withMessage('Tags must be an array with at most 20 values'),
  body('tags.*').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Each tag must be between 1 and 50 characters'),
  body('image').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Image must be between 1 and 1000 characters'),
  body('links').isArray({ min: 1, max: 20 }).withMessage('Links must be an array containing 1 to 20 links'),
  body('links.*.title').trim().notEmpty().withMessage('Each link title is required').isLength({ max: 100 }).withMessage('Each link title must not exceed 100 characters'),
  body('links.*.url').trim().notEmpty().withMessage('Each link URL is required').isURL().withMessage('Each link URL must be valid'),
];

export const createBlogValidator = [...blogFields, parseValidationErrors];
export const updateBlogValidator = [
  param('id').isMongoId().withMessage('Invalid blog ID format'),
  body('author').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Author must be between 2 and 100 characters'),
  body('title').optional().trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('intro').optional().trim().isLength({ min: 10, max: 500 }).withMessage('Intro must be between 10 and 500 characters'),
  body('description').optional().trim().isLength({ min: 20, max: 20000 }).withMessage('Description must be between 20 and 20000 characters'),
  body('datePublished').optional().isISO8601().toDate().withMessage('datePublished must be a valid ISO 8601 date'),
  body('tags').optional().isArray({ max: 20 }).withMessage('Tags must be an array with at most 20 values'),
  body('tags.*').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Each tag must be between 1 and 50 characters'),
  body('image').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Image must be between 1 and 1000 characters'),
  body('links').optional().isArray({ min: 1, max: 20 }).withMessage('Links must be an array containing 1 to 20 links'),
  body('links.*.title').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Each link title must be between 1 and 100 characters'),
  body('links.*.url').optional().trim().isURL().withMessage('Each link URL must be valid'),
  parseValidationErrors,
];
export const blogIdParamValidator = [param('id').isMongoId().withMessage('Invalid blog ID format'), parseValidationErrors];
