import { body, param } from 'express-validator';
import parseValidationErrors from './errorParser.js';

export const createActivityValidator = [
  body('action').trim().notEmpty().withMessage('Action is required').isLength({ max: 150 }).withMessage('Action must not exceed 150 characters'),
  body('destination').trim().notEmpty().withMessage('Destination is required').isLength({ max: 255 }).withMessage('Destination must not exceed 255 characters'),
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 3, max: 150 }).withMessage('Title must be between 3 and 150 characters'),
  body('date').optional().isISO8601().toDate().withMessage('Date must be a valid ISO 8601 date'),
  parseValidationErrors,
];

export const activityIdParamValidator = [param('id').isMongoId().withMessage('Invalid activity ID format'), parseValidationErrors];
