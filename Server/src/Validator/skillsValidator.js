import { body, param } from 'express-validator';
import parseValidationErrors from './errorParser.js';

export const createTechnicalSkillValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  body('techStack').isArray({ min: 1, max: 30 }).withMessage('Tech stack must be an array containing 1 to 30 items'),
  body('techStack.*.name').trim().notEmpty().withMessage('Each technology name is required').isLength({ max: 100 }).withMessage('Each technology name must not exceed 100 characters'),
  body('techStack.*.icon').trim().notEmpty().withMessage('Each technology icon is required').isLength({ max: 500 }).withMessage('Each technology icon must not exceed 500 characters'),
  parseValidationErrors,
];
export const updateTechnicalSkillValidator = [param('id').isMongoId().withMessage('Invalid technical skill ID format'), body('title').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'), body('techStack').optional().isArray({ min: 1, max: 30 }).withMessage('Tech stack must contain 1 to 30 items'), body('techStack.*.name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Technology name must be between 1 and 100 characters'), body('techStack.*.icon').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Technology icon must be between 1 and 500 characters'), parseValidationErrors];
export const technicalSkillIdParamValidator = [param('id').isMongoId().withMessage('Invalid technical skill ID format'), parseValidationErrors];
export const createTechValidator = [param('id').isMongoId().withMessage('Invalid technical skill ID format'), body('name').trim().notEmpty().withMessage('Technology name is required').isLength({ max: 100 }).withMessage('Technology name must not exceed 100 characters'), body('icon').trim().notEmpty().withMessage('Technology icon is required').isLength({ max: 500 }).withMessage('Technology icon must not exceed 500 characters'), parseValidationErrors];
export const techIdParamValidator = [param('id').isMongoId().withMessage('Invalid technical skill ID format'), param('techId').isMongoId().withMessage('Invalid technology ID format'), parseValidationErrors];
export const createConceptualSkillValidator = [body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'), body('description').trim().notEmpty().withMessage('Description is required').isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'), body('icon').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Icon must be between 1 and 500 characters'), parseValidationErrors];
export const conceptualSkillIdParamValidator = [param('id').isMongoId().withMessage('Invalid conceptual skill ID format'), parseValidationErrors];
