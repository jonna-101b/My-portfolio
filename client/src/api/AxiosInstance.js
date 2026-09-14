import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';
// process.env.REACT_APP_API_URL  = base URL for the backend API, can be set in .env file for different environments

// 1. Public Instance (For Portfolio visitors)
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Protected Instance (For Admin Dashboard with Cookie-based auth)
export const protectedApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Used to prevent multiple refresh requests
let refreshPromise = null;

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    // No config? Just fail.
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Don't try to refresh if refresh endpoint itself failed
    if (originalRequest.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response?.status === 401;

    if (isUnauthorized && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {  // Only one refresh request at a time
          refreshPromise = protectedApi
            .post('/auth/refresh')
            .then(() => { })
            .finally(() => {
              refreshPromise = null;
            });
        }

        await refreshPromise;

        // Retry original request
        return protectedApi(originalRequest);
      } catch (refreshError) {    // Refresh token expired or invalid
        refreshPromise = null;

        // Let the caller (the startup session check or request saga)
        // handle the rejected request. Redirecting here can create a
        // refresh loop on the login page.
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);