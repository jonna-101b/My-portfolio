import { APPError } from "./APPError.js";

export class APIError extends APPError {

    constructor(message, statusCode = 500, errors = [], isOperational = true, stack) {
        super(message, statusCode, isOperational);
        this.errors = errors;
        this.statusCode = statusCode;

        if (stack) {
            this.stack = stack;
        }
    }

    // Pre-configured static helpers
    static badRequest(message, errors, stack) {
        return new APIError(message, 400, errors, true, stack);
    }

    static unauthorized(message = 'Unauthorized', stack) {
        return new APIError(message, 401, undefined, true, stack);
    }

    static forbidden(message = 'Forbidden', stack) {
        return new APIError(message, 403, undefined, true, stack);
    }

    static notFound(message = 'Resource not found', stack) {
        return new APIError(message, 404, undefined, true, stack);
    }
}