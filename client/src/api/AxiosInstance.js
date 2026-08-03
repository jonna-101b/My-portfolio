import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 
// process.env.REACT_APP_API_URL  = base URL for the backend API, can be set in .env file for different environments

// 1. Public Instance (For Portfolio visitors)
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Protected Instance (For Admin Dashboard)
export const protectedApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios Request Interceptor: Automatically attach JWT token to every protected request
protectedApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);