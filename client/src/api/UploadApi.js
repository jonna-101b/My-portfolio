import { protectedApi } from './AxiosInstance';

/**
 * Upload an image file to the server (allowed: JPG, PNG, WEBP, GIF, SVG)
 * @param {File} file - Image File object
 * @param {Function} [onProgress] - Optional progress callback
 * @returns {Promise<{ success: boolean, url: string, filename: string, originalName: string, size: number, mimetype: string }>}
 */
export const uploadImage = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await protectedApi.post('/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      }
    },
  });

  return response.data;
};

/**
 * Upload a document file to the server (allowed: PDF, DOC, DOCX, TXT)
 * @param {File} file - Document File object
 * @param {Function} [onProgress] - Optional progress callback
 * @returns {Promise<{ success: boolean, url: string, filename: string, originalName: string, size: number, mimetype: string }>}
 */
export const uploadDocument = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('document', file);

  const response = await protectedApi.post('/upload/document', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      }
    },
  });

  return response.data;
};

/**
 * Upload any supported file (image or document) to the server
 * @param {File} file - File object
 * @param {Function} [onProgress] - Optional progress callback
 * @returns {Promise<{ success: boolean, url: string, filename: string, originalName: string, size: number, mimetype: string }>}
 */
export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await protectedApi.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      }
    },
  });

  return response.data;
};
