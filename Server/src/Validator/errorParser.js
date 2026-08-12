import { validationResult } from 'express-validator';

// Stops the request before controllers run when any validator fails.
const parseValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(({ type, path, location, msg }) => ({ type, path, location, message: msg })),
    });
  }
  next();
};

export default parseValidationErrors;
