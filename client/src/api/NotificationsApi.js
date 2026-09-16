import { publicApi, protectedApi } from './AxiosInstance';

// --- Public Endpoints ---
export const fetchNotifications = async () => {
  const response = await publicApi.get('/notifications');
  return response.data;
};

// --- Public / Contact Endpoints ---
export const createNotification = async (notificationData) => {
  const response = await publicApi.post('/notifications', notificationData);
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await protectedApi.delete(`/notifications/${id}`);
  return response.data;
};

export const sendForgotPasswordNotification = async (email) => {
  const response = await publicApi.post('/notifications/forgot-password', { email });
  return response.data;
};