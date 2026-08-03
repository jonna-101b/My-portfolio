import { publicApi, protectedApi } from './AxiosInstance';

// --- Public Endpoints ---
export const fetchActivities = async () => {
  const response = await publicApi.get('/activities');
  return response.data;
};

// --- Protected Admin Endpoints ---
export const createActivity = async (activitiesData) => {
  const response = await protectedApi.post('/activities', activitiesData);
  return response.data;
};

export const deleteActivity = async (id) => {
  const response = await protectedApi.delete(`/activities/${id}`);
  return response.data;
};