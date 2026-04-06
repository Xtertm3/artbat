import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { ROUTES } from '@/config/routes';
import type { RegisterData } from '@/types';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken, logout: logoutStore, user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login({ email, password });
      setToken(res.token);
      setUser(res.user);
      const redirect = {
        student: ROUTES.STUDENT_DASHBOARD,
        instructor: ROUTES.INSTRUCTOR_DASHBOARD,
        admin: ROUTES.ADMIN_DASHBOARD,
      }[res.user.role];
      navigate(redirect);
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Invalid credentials';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(data);
      navigate(ROUTES.LOGIN + '?registered=true');
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Registration failed';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutStore();
    navigate(ROUTES.LOGIN);
  };

  return { login, register, logout, isLoading, error, user, isAuthenticated };
}
