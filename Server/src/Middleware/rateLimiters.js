import rateLimit from 'express-rate-limit';

/**
 * General rate limiter for all public and protected API endpoints
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Max 1000 requests per 15 minutes per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Too many requests from this IP, please try again after 15 minutes.'
    }
});

/**
 * Stricter rate limiter for sensitive authentication endpoints (e.g. login)
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Max 20 attempts per 15 minutes per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Too many login attempts from this IP, please try again after 15 minutes.'
    }
});
