import { parseImageUrl, getBackendBaseUrl } from './imageUtils';

export { getBackendBaseUrl };

/**
 * Returns a displayable/downloadable URL for any asset, whether it is a local upload path,
 * blob URL, data URL, static client asset, File/Blob object, or external URL.
 * 
 * @param {string|File|Blob|object} [pathOrUrl=''] - The image or document URL/path/file
 * @returns {string} Formatted URL
 */
export const getAssetUrl = (pathOrUrl) => {
  return parseImageUrl(pathOrUrl);
};

export default getAssetUrl;
