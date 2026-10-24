/**
 * Application environment configuration
 * Automatically resolves API base URL from VITE_API_URL or defaults to current origin / local dev.
 */

const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim();

// Strip trailing slash if present
const cleanUrl = (url) => url.replace(/\/+$/, '');

export const API_BASE_URL = cleanUrl(rawApiUrl) || (
  typeof window !== 'undefined' && (window.location?.hostname === 'localhost' || window.location?.hostname === '127.0.0.1')
    ? `http://${window.location.hostname}:3000/api`
    : '/api'
);

// Root backend URL without '/api' (for static uploads, media, and direct links)
export const BACKEND_ROOT_URL = API_BASE_URL.replace(/\/api$/, '');

export default {
  API_BASE_URL,
  BACKEND_ROOT_URL,
};
