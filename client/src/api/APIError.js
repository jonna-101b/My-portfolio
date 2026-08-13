/**
 * Custom Error class for handling API request failures.
 */
export class APIError extends Error {
  constructor(message, statusCode = null, data = null, originalError = null) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.data = data;
    this.originalError = originalError;
    this.isOperational = true;

    // Ensure correct prototype chain
    Object.setPrototypeOf(this, APIError.prototype);
  }

  /**
   * Factory helper to construct an APIError from an Axios error or standard error.
   * @param {Error|any} error - The caught error
   * @param {string} [defaultMessage='A server error occurred.'] - Fallback error message
   * @returns {APIError}
   */
  static fromAxiosError(error, defaultMessage = 'A server error occurred.') {
    if (error instanceof APIError) {
      return error;
    }

    const statusCode = error?.response ? error.response.status : null;
    const data = error?.response ? error.response.data : null;

    let message = defaultMessage;

    if (data && typeof data === 'object') {
      message = data.message || data.error || defaultMessage;
    } else if (typeof data === 'string' && data.trim().length > 0) {
      message = data;
    } else if (error?.message) {
      if (error.message === 'Network Error') {
        message = 'Unable to connect to the server. Please check your connection or backend server status.';
      } else {
        message = error.message;
      }
    }

    return new APIError(message, statusCode, data, error);
  }
}

export default APIError;
