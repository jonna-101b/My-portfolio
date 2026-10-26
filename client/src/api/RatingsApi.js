import { publicApi, protectedApi } from './AxiosInstance';

/**
 * Create a new rating (public endpoint)
 * @param {{ rating: number, feedback?: string }} ratingData - Rating payload
 * @returns {Promise<{ _id: string, rating: number, feedback?: string, createdAt: string, updatedAt: string }>}
 */
export const createRating = async (ratingData) => {
  const response = await publicApi.post('/ratings', ratingData);
  return response.data;
};

/**
 * Update an existing rating
 * @param {string} id - Rating ID
 * @param {{ rating?: number, feedback?: string }} ratingData - Updated rating payload
 * @returns {Promise<{ _id: string, rating: number, feedback?: string, createdAt: string, updatedAt: string }>}
 */
export const updateRating = async (id, ratingData) => {
  const response = await publicApi.put(`/ratings/${id}`, ratingData);
  return response.data;
};

/**
 * Delete a rating
 * @param {string} id - Rating ID
 * @returns {Promise<{ _id: string }>}
 */
export const deleteRating = async (id) => {
  const response = await publicApi.delete(`/ratings/${id}`);
  return response.data;
};

export default {
  createRating,
  updateRating,
  deleteRating,
};
