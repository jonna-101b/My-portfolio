import { publicApi } from './AxiosInstance';

export async function loginAdmin(credentials) {
  const response = await publicApi.post('/admin/auth/login', credentials);
  return response.data;
}