import { publicApi, protectedApi } from './AxiosInstance';

// --- Public Endpoints ---
export const fetchBlogs = async () => {
  const response = await publicApi.get('/blogs');
  return response.data;
};

// --- Protected Admin Endpoints ---
export const createBlog = async (blogData) => {
  const response = await protectedApi.post('/blogs', blogData);
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await protectedApi.put(`/blogs/${id}`, blogData);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await protectedApi.delete(`/blogs/${id}`);
  return response.data;
};