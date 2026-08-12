import { body, param } from 'express-validator';
import parseValidationErrors from './errorParser.js';

export const createNotificationValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ min: 3, max: 200 }).withMessage('Subject must be between 3 and 200 characters'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 5, max: 5000 }).withMessage('Message must be between 5 and 5000 characters'),
  body('date').optional().isISO8601().toDate().withMessage('Date must be a valid ISO 8601 date'),
  parseValidationErrors,
];

export const notificationIdParamValidator = [param('id').isMongoId().withMessage('Invalid notification ID format'), parseValidationErrors];
