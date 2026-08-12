import rateLimit from 'express-rate-limit';

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        error: 'Too many messages sent from this IP. Please try again after 15 minutes.'
    },
    standardHeaders: true, // Return rate limit info in headers (`RateLimit-*`)
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

export default contactLimiter;