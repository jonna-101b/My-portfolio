import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const envScchema = joi.object({
    PORT: joi.number().default(5000),
    NODE_ENV: joi.string()
        .valid("development", "production", "test")
        .default("development"),
    MONGO_URI: joi.string()
        .required()
        .description("MongoDB connection string"),
    JWT_ACCESS_SECRET: joi.string()
        .required()
        .description("JWT Access Secret Key"),
    JWT_REFRESH_SECRET: joi.string()
        .required()
        .description("JWT Refresh Secret Key"),
    MY_GMAIL: joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        'string.email': 'MY_GMAIL must be a valid email address.',
        'any.required': 'MY_GMAIL environment variable is missing.'
        }),

    RESEND_API_KEY: joi.string()
        .pattern(/^re_[a-zA-Z0-9_]+$/)
        .required()
        .messages({
            'string.pattern.base': 'RESEND_API_KEY must start with "re_" followed by valid key characters.',
            'any.required': 'RESEND_API_KEY environment variable is missing.'
        }),
    MY_PORTFOLIO_PASSWORD: joi.string()
        .required()
        .messages({
        'any.required': 'MY_PORTFOLIO_PASSWORD environment variable is missing.'
        }),
    MY_NICKNAME: joi.string()
        .required()
        .messages({
            'any.required': 'MY_NICKNAME environment variable is missing.'
        })
}).unknown(true);

const { error, value: envVars } = envScchema.validate(process.env);

if (error) {
    throw new Error(`Environment variables config validation error: ${error.message}`)
}

export const config = {
    port: envVars.PORT,
    env: envVars.NODE_ENV,
    mongoUri: envVars.MONGO_URI,
    jwtAccessSecret: envVars.JWT_ACCESS_SECRET,
    jwtRefreshSecret: envVars.JWT_REFRESH_SECRET,
    myGmail: envVars.MY_GMAIL,
    resendApiKey: envVars.RESEND_API_KEY,
    myPortfolioPassword: envVars.MY_PORTFOLIO_PASSWORD,
    myName: envVars.MY_NICKNAME
};
