import { publicApi, protectedApi } from './AxiosInstance';

// --- Public Endpoints ---
export const fetchProjects = async () => {
  const response = await publicApi.get('/projects');
  return response.data;
};

// --- Protected Admin Endpoints ---
export const createProject = async (projectData) => {
  const response = await protectedApi.post('/projects', projectData);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await protectedApi.put(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await protectedApi.delete(`/projects/${id}`);
  return response.data;
};