const BACKEND_BASE_URL = 'http://localhost:5000';

/**
 * Returns a displayable/downloadable URL for any asset, whether it is a local upload path,
 * blob URL, data URL, static client asset, or external URL.
 * 
 * @param {string} [pathOrUrl=''] - The image or document URL/path
 * @returns {string} Formatted URL
 */
export const getAssetUrl = (pathOrUrl) => {
  if (!pathOrUrl || typeof pathOrUrl !== 'string') {
    return '';
  }

  // Already a blob or data URI (from local file pickers)
  if (pathOrUrl.startsWith('blob:') || pathOrUrl.startsWith('data:')) {
    return pathOrUrl;
  }

  // Full absolute URLs (http:// or https://)
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  // Server upload paths (starts with /uploads or uploads/)
  if (pathOrUrl.startsWith('/uploads')) {
    return `${BACKEND_BASE_URL}${pathOrUrl}`;
  }

  if (pathOrUrl.startsWith('uploads/')) {
    return `${BACKEND_BASE_URL}/${pathOrUrl}`;
  }

  // Local client public assets or relative paths (e.g. /favicon.ico, /images/...)
  return pathOrUrl;
};
