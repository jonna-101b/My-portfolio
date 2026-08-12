import { body, param } from 'express-validator';
import parseValidationErrors from './errorParser.js';

const testimonialFields = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('position').trim().notEmpty().withMessage('Position is required').isLength({ min: 2, max: 100 }).withMessage('Position must be between 2 and 100 characters'),
  body('picture').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Picture must be between 1 and 1000 characters'),
  body('testimony').trim().notEmpty().withMessage('Testimony is required').isLength({ min: 10, max: 2000 }).withMessage('Testimony must be between 10 and 2000 characters'),
  body('company').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Company must be between 2 and 100 characters'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid').normalizeEmail(),
];

export const createTestimonialValidator = [...testimonialFields, parseValidationErrors];
export const updateTestimonialValidator = [
  param('id').isMongoId().withMessage('Invalid testimonial ID format'),
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('position').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Position must be between 2 and 100 characters'),
  body('picture').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Picture must be between 1 and 1000 characters'),
  body('testimony').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Testimony must be between 10 and 2000 characters'),
  body('company').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Company must be between 2 and 100 characters'),
  body('email').optional().trim().isEmail().withMessage('Email must be valid').normalizeEmail(),
  parseValidationErrors,
];
export const testimonialIdParamValidator = [param('id').isMongoId().withMessage('Invalid testimonial ID format'), parseValidationErrors];
