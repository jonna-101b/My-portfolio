import { body, param } from 'express-validator';
import parseValidationErrors from './errorParser.js';

const projectCreateFields = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 3, max: 150 }).withMessage('Title must be between 3 and 150 characters'),
  body('domains').isArray({ min: 1, max: 10 }).withMessage('Domains must be an array containing 1 to 10 values'),
  body('domains.*').trim().notEmpty().withMessage('Each domain is required').isLength({ max: 50 }).withMessage('Each domain must not exceed 50 characters'),
  body('description').isObject().withMessage('Description must be an object'),
  body('description.brief').trim().notEmpty().withMessage('Brief description is required').isLength({ min: 10, max: 500 }).withMessage('Brief description must be between 10 and 500 characters'),
  body('description.detailed').trim().notEmpty().withMessage('Detailed description is required').isLength({ min: 20, max: 10000 }).withMessage('Detailed description must be between 20 and 10000 characters'),
  body('image').trim().notEmpty().withMessage('Image is required').isLength({ max: 1000 }).withMessage('Image must not exceed 1000 characters'),
  body('features').optional().isArray({ max: 30 }).withMessage('Features must be an array with at most 30 values'),
  body('features.*').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Each feature must be between 1 and 200 characters'),
  body('techStack').isArray({ min: 1, max: 30 }).withMessage('Tech stack must be an array containing 1 to 30 items'),
  body('techStack.*.name').trim().notEmpty().withMessage('Each technology name is required').isLength({ max: 100 }).withMessage('Each technology name must not exceed 100 characters'),
  body('techStack.*.icon').trim().notEmpty().withMessage('Each technology icon is required').isLength({ max: 500 }).withMessage('Each technology icon must not exceed 500 characters'),
  body('projectLink').trim().notEmpty().withMessage('Project link is required').isURL().withMessage('Project link must be valid'),
  body('githubLink').trim().notEmpty().withMessage('GitHub link is required').isURL().withMessage('GitHub link must be valid'),
  body('contribution').trim().notEmpty().withMessage('Contribution is required').isLength({ min: 3, max: 500 }).withMessage('Contribution must be between 3 and 500 characters'),
];

export const createProjectValidator = [...projectCreateFields, parseValidationErrors];
export const updateProjectValidator = [
  param('id').isMongoId().withMessage('Invalid project ID format'),
  body('title').optional().trim().isLength({ min: 3, max: 150 }).withMessage('Title must be between 3 and 150 characters'),
  body('domains').optional().isArray({ min: 1, max: 10 }).withMessage('Domains must be an array containing 1 to 10 values'),
  body('domains.*').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Each domain must be between 1 and 50 characters'),
  body('description').optional().isObject().withMessage('Description must be an object'),
  body('description.brief').optional().trim().isLength({ min: 10, max: 500 }).withMessage('Brief description must be between 10 and 500 characters'),
  body('description.detailed').optional().trim().isLength({ min: 20, max: 10000 }).withMessage('Detailed description must be between 20 and 10000 characters'),
  body('image').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Image must be between 1 and 1000 characters'),
  body('features').optional().isArray({ max: 30 }).withMessage('Features must be an array with at most 30 values'),
  body('features.*').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Each feature must be between 1 and 200 characters'),
  body('techStack').optional().isArray({ min: 1, max: 30 }).withMessage('Tech stack must be an array containing 1 to 30 items'),
  body('techStack.*.name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Each technology name must be between 1 and 100 characters'),
  body('techStack.*.icon').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Each technology icon must be between 1 and 500 characters'),
  body('projectLink').optional().trim().isURL().withMessage('Project link must be valid'),
  body('githubLink').optional().trim().isURL().withMessage('GitHub link must be valid'),
  body('contribution').optional().trim().isLength({ min: 3, max: 500 }).withMessage('Contribution must be between 3 and 500 characters'),
  parseValidationErrors,
];
export const projectIdParamValidator = [param('id').isMongoId().withMessage('Invalid project ID format'), parseValidationErrors];
