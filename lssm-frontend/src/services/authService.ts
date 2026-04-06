import api from '@/lib/axios';
import type { AuthResponse, LoginCredentials, RegisterData, User } from '@/types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },

  register: async (data: RegisterData): Promise<{ message: string }> => {
    const res = await api.post('/auth/register', data);
    return res.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const res = await api.post('/auth/forgot-password', { email });
    return res.data;
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const res = await api.post('/auth/reset-password', { token, password });
    return res.data;
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const res = await api.post('/auth/verify-email', { token });
    return res.data;
  },
};
