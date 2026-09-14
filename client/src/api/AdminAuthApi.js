import { publicApi } from './AxiosInstance';


export const login = async (credentials) => {
  const response = await publicApi.post('/auth/login', credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const logout = async () => {
  const response = await publicApi.post('/auth/logout', {}, {
    withCredentials: true,
  });
  return response.data;
};

export const getUser = async () => {
  const response = await publicApi.get('/auth/admin', {
    withCredentials: true,
  });
  return response.data;
};

export const refreshToken = async () => {
  const response = await publicApi.post('/auth/refresh', {}, {
    withCredentials: true,
  });
  return response.data;
};

export const loginAdmin = login;
export const logoutAdmin = logout;
export const getAdminUser = getUser;
export const refreshAdminToken = refreshToken;