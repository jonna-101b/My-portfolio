import { APPError } from '../Errors/APPError.js';
import { APIError } from '../Errors/APIError.js';
import { config } from '../Config/environments.js';

export const globalErrorHandler = (err, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    let statusCode = 500;
    let message = 'Internal Server Error';
    let errors;

    // Handle APPError (and APIError since it extends APPError)
    if (err instanceof APPError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // Extract nested validation/details array if it's an APIError
    if (err instanceof APIError && err.errors) {
        errors = err.errors;
    }

    // Standardize response for production vs development
    const isDev = config.env === 'development';

    res.status(statusCode).json({
        success: false,
        message: isDev ? err.message : message,
        ...(errors && errors.length > 0 && { errors }),
        ...(isDev && { stack: err.stack }),
    });
};