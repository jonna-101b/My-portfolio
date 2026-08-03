import { publicApi, protectedApi } from './AxiosInstance';

// --- Public Endpoints ---
export const fetchNotifications = async () => {
  const response = await publicApi.get('/notifications');
  return response.data;
};

// --- Protected Admin Endpoints ---
export const createNotification = async (notificationData) => {
  const response = await protectedApi.post('/notifications', notificationData);
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await protectedApi.delete(`/notifications/${id}`);
  return response.data;
};