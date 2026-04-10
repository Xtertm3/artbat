import axios from 'axios';
import { API_URL } from '@/config/constants';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lssm_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect if NOT already on the login page to avoid infinite loops
    // and ONLY if the status is 401 (Unauthorized)
    if (error.response?.status === 401 && !window.location.pathname.includes('/auth/login')) {
      localStorage.removeItem('lssm_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);


export default api;
