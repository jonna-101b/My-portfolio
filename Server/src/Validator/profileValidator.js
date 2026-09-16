import { body, param } from 'express-validator';
import parseValidationErrors from './errorParser.js';

export const updateProfileValidator = [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
  body('nickName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Nickname must be between 2 and 50 characters'),
  body('gender').optional().trim().isLength({ min: 2, max: 30 }).withMessage('Gender must be between 2 and 30 characters'),
  body('birthDate').optional().isISO8601().toDate().withMessage('Birth date must be a valid ISO 8601 date'),
  body('profession').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Profession must be between 2 and 100 characters'),
  body('picture').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Picture must be between 1 and 1000 characters'),
  body('bio').optional().trim().isLength({ min: 10, max: 5000 }).withMessage('Bio must be between 10 and 5000 characters'),
  body('logo').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Logo must be between 1 and 1000 characters'),
  body('description').optional().isObject().withMessage('Description must be an object'),
  body('description.brief').optional().trim().isLength({ min: 10, max: 500 }).withMessage('Brief description must be between 10 and 500 characters'),
  body('description.detailed').optional().trim().isLength({ min: 20, max: 10000 }).withMessage('Detailed description must be between 20 and 10000 characters'),
  body('phone').optional().trim().isLength({ min: 5, max: 30 }).withMessage('Phone must be between 5 and 30 characters'),
  body('email').optional().trim().isEmail().withMessage('Email must be valid').normalizeEmail(),
  body('address').optional().trim().isLength({ min: 5, max: 300 }).withMessage('Address must be between 5 and 300 characters'),
  body('socialLinks').optional().isArray({ min: 1, max: 20 }).withMessage('Social links must be an array containing 1 to 20 items'),
  body('socialLinks.*.name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Social link name must be between 2 and 50 characters'),
  body('socialLinks.*.icon').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Social link icon must be between 1 and 500 characters'),
  body('socialLinks.*.url').optional().trim().isURL().withMessage('Social link URL must be valid'),
  body('resumeLink').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Resume link must be between 1 and 1000 characters'),
  parseValidationErrors,
];

export const updateDescriptionValidator = [
  body('brief').trim().notEmpty().withMessage('Brief description is required').isLength({ min: 10, max: 500 }).withMessage('Brief description must be between 10 and 500 characters'),
  body('detailed').trim().notEmpty().withMessage('Detailed description is required').isLength({ min: 20, max: 10000 }).withMessage('Detailed description must be between 20 and 10000 characters'),
  parseValidationErrors,
];

export const createSocialLinksValidator = [
  body().isArray({ min: 1, max: 20 }).withMessage('Social links must be an array containing 1 to 20 items'),
  body('*.name').trim().notEmpty().withMessage('Social link name is required').isLength({ min: 2, max: 50 }).withMessage('Social link name must be between 2 and 50 characters'),
  body('*.icon').trim().notEmpty().withMessage('Social link icon is required').isLength({ max: 500 }).withMessage('Social link icon must not exceed 500 characters'),
  body('*.url').trim().notEmpty().withMessage('Social link URL is required').isURL().withMessage('Social link URL must be valid'),
  parseValidationErrors,
];

export const updateSocialLinkValidator = [
  param('id').isMongoId().withMessage('Invalid social link ID format'),
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Social link name must be between 2 and 50 characters'),
  body('icon').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Social link icon must be between 1 and 500 characters'),
  body('url').optional().trim().isURL().withMessage('Social link URL must be valid'),
  parseValidationErrors,
];

export const socialLinkIdParamValidator = [param('id').isMongoId().withMessage('Invalid social link ID format'), parseValidationErrors];
