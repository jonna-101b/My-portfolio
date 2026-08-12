import { body, param } from 'express-validator';
import parseValidationErrors from './errorParser.js';

const qualificationFields = [
  body('discipline').trim().notEmpty().withMessage('Discipline is required').isLength({ min: 2, max: 150 }).withMessage('Discipline must be between 2 and 150 characters'),
  body('organization').trim().notEmpty().withMessage('Organization is required').isLength({ min: 2, max: 150 }).withMessage('Organization must be between 2 and 150 characters'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('duration').isObject().withMessage('Duration must be an object'),
  body('duration.from').isISO8601().toDate().withMessage('Duration start date must be valid'),
  body('duration.to').isISO8601().toDate().withMessage('Duration end date must be valid'),
  body('active').optional().isBoolean().withMessage('Active must be true or false').toBoolean(),
  body('type').trim().notEmpty().withMessage('Type is required').isLength({ min: 2, max: 100 }).withMessage('Type must be between 2 and 100 characters'),
];

export const createQualificationValidator = [...qualificationFields, parseValidationErrors];
export const updateQualificationValidator = [
  param('id').isMongoId().withMessage('Invalid qualification ID format'),
  body('discipline').optional().trim().isLength({ min: 2, max: 150 }).withMessage('Discipline must be between 2 and 150 characters'),
  body('organization').optional().trim().isLength({ min: 2, max: 150 }).withMessage('Organization must be between 2 and 150 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('duration').optional().isObject().withMessage('Duration must be an object'),
  body('duration.from').optional().isISO8601().toDate().withMessage('Duration start date must be valid'),
  body('duration.to').optional().isISO8601().toDate().withMessage('Duration end date must be valid'),
  body('active').optional().isBoolean().withMessage('Active must be true or false').toBoolean(),
  body('type').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Type must be between 2 and 100 characters'),
  parseValidationErrors,
];
export const qualificationIdParamValidator = [param('id').isMongoId().withMessage('Invalid qualification ID format'), parseValidationErrors];
