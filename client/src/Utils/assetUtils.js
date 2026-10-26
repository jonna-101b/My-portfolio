import { parseImageUrl, getBackendBaseUrl, isCloudinaryUrl } from './imageUtils';

export { getBackendBaseUrl, isCloudinaryUrl };

/**
 * Returns a displayable/downloadable URL for any asset, whether it is a Cloudinary URL,
 * local upload path, blob URL, data URL, static client asset, File/Blob object, or external URL.
 * 
 * @param {string|File|Blob|object} [pathOrUrl=''] - The image or document URL/path/file
 * @param {object} [options={}] - Options (e.g., download: true to add fl_attachment for Cloudinary)
 * @returns {string} Formatted URL
 */
export const getAssetUrl = (pathOrUrl, options = {}) => {
  const url = parseImageUrl(pathOrUrl);
  if (!url) return '';

  // If download is requested and it's a Cloudinary URL, append fl_attachment flag
  if (options.download && isCloudinaryUrl(url) && !url.includes('fl_attachment')) {
    return url.replace('/upload/', '/upload/fl_attachment/');
  }

  return url;
};

/**
 * Returns a direct download URL for an asset
 * @param {string|File|Blob|object} pathOrUrl
 * @returns {string}
 */
export const getDownloadUrl = (pathOrUrl) => {
  return getAssetUrl(pathOrUrl, { download: true });
};

export default getAssetUrl;
