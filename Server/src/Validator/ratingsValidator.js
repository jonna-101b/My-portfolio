import { body, param } from 'express-validator';
import parseValidationErrors from './errorParser.js';

export const createRatingValidator = [
  body('rating').notEmpty().withMessage('Rating is required').isInt({ min: 1, max: 5 }).withMessage('Rating must be a whole number from 1 to 5'),
  body('feedback').optional({ checkFalsy: true }).trim().isString().withMessage('Feedback must be a string').isLength({ max: 500 }).withMessage('Feedback must not exceed 500 characters'),
  parseValidationErrors,
];

export const updateRatingValidator = [
  param('id').isMongoId().withMessage('Invalid rating ID format'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be a whole number from 1 to 5'),
  body('feedback').optional({ nullable: true }).trim().isString().withMessage('Feedback must be a string').isLength({ max: 500 }).withMessage('Feedback must not exceed 500 characters'),
  body().custom((value) => Object.keys(value).some((key) => ['rating', 'feedback'].includes(key))).withMessage('Provide a rating or feedback to update'),
  parseValidationErrors,
];

export const ratingIdParamValidator = [param('id').isMongoId().withMessage('Invalid rating ID format'), parseValidationErrors];
