import { publicApi, protectedApi } from './AxiosInstance';

// --- Public Endpoints ---
export const fetchTestimonials = async () => {
  const response = await publicApi.get('/testimonials');
  return response.data;
};

// --- Protected Admin Endpoints ---
export const createTestimonial = async (testimonialData) => {
  const response = await protectedApi.post('/testimonials', testimonialData);
  return response.data;
};

export const updateTestimonial = async (id, testimonialData) => {
  const response = await protectedApi.put(`/testimonials/${id}`, testimonialData);
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await protectedApi.delete(`/testimonials/${id}`);
  return response.data;
};