export class APIError extends Error {
  constructor(message, statusCode = null, data = null, originalError = null) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.data = data;
    this.originalError = originalError;
    this.isOperational = true;

    Object.setPrototypeOf(this, APIError.prototype);
  }

  // Ensures message is included when serialized to JSON
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      data: this.data,
      isOperational: this.isOperational,
    };
  }

  static fromAxiosError(error, defaultMessage = 'A server error occurred.') {
    if (error instanceof APIError) {
      return error;
    }

    const statusCode = error?.response?.status ?? null;
    const data = error?.response?.data ?? null;

    let message = null;

    // 1. Try extracting string message from response data
    if (data && typeof data === 'object') {
      const detailsList = Array.isArray(data.details) ? data.details : (Array.isArray(data.errors) ? data.errors : null);
      if (detailsList && detailsList.length > 0) {
        const detailMsgs = detailsList.map((d) => (typeof d === 'string' ? d : (d?.message || d?.msg))).filter(Boolean);
        if (detailMsgs.length > 0) {
          message = detailMsgs.join('; ');
        }
      }

      if (!message) {
        const candidate = data.message || data.error;
        if (typeof candidate === 'string' && candidate.trim()) {
          message = candidate;
        }
      }
    } else if (typeof data === 'string' && data.trim() && !data.trim().startsWith('<')) {
      // Avoid using full HTML pages as error messages
      message = data.trim();
    }

    // 2. Fall back to Axios / network error message
    if (!message && error?.message) {
      if (error.message === 'Network Error') {
        message = 'Unable to connect to the server. Please check your connection or backend server status.';
      } else {
        message = error.message;
      }
    }

    // 3. Fall back to default message
    message = message || defaultMessage;

    return new APIError(message, statusCode, data, error);
  }
}
