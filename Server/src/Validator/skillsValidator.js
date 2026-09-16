import { body, param } from 'express-validator';
import parseValidationErrors from './errorParser.js';

export const createTechnicalSkillValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),
  body('label').trim().notEmpty().withMessage('Label (category) is required').isLength({ min: 1, max: 100 }).withMessage('Label must be between 1 and 100 characters'),
  body('icon').trim().notEmpty().withMessage('Icon is required').isLength({ min: 1, max: 500 }).withMessage('Icon must be between 1 and 500 characters'),
  parseValidationErrors,
];

export const updateTechnicalSkillValidator = [
  param('id').isMongoId().withMessage('Invalid technical skill ID format'),
  body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),
  body('label').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Label must be between 1 and 100 characters'),
  body('icon').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Icon must be between 1 and 500 characters'),
  parseValidationErrors,
];

export const technicalSkillIdParamValidator = [
  param('id').isMongoId().withMessage('Invalid technical skill ID format'),
  parseValidationErrors,
];

export const createConceptualSkillValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  parseValidationErrors,
];

export const updateConceptualSkillValidator = [
  param('id').isMongoId().withMessage('Invalid conceptual skill ID format'),
  body('title').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  parseValidationErrors,
];

export const conceptualSkillIdParamValidator = [
  param('id').isMongoId().withMessage('Invalid conceptual skill ID format'),
  parseValidationErrors,
];
