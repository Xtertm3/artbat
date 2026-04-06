import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';
import { authService } from '@/services/authService';
import { connectSocket, disconnectSocket } from '@/lib/socket';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
  demoLogin: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      setToken: (token) => {
        localStorage.setItem('lssm_token', token);
        set({ token });
      },

      logout: () => {
        localStorage.removeItem('lssm_token');
        disconnectSocket();
        set({ user: null, token: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        const token = get().token || localStorage.getItem('lssm_token');
        if (!token || token === 'demo-token') return;
        set({ isLoading: true });
        try {
          const user = await authService.getCurrentUser();
          connectSocket(token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch {
          get().logout();
          set({ isLoading: false });
        }
      },

      demoLogin: (role: UserRole) => {
        const DEMO_NAMES: Record<UserRole, string> = {
          student: 'Arjun Mehta',
          instructor: 'Priya Sharma',
          admin: 'Admin User',
        };
        const mockUser: User = {
          id: `demo-${role}`,
          name: DEMO_NAMES[role],
          email: `demo-${role}@lssm.in`,
          role,
          avatar: '',
          isVerified: true,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('lssm_token', 'demo-token');
        set({ user: mockUser, token: 'demo-token', isAuthenticated: true, isLoading: false });
      },
    }),
    {
      name: 'lssm-auth',
      partialize: (state) => ({ token: state.token }),
    }
  )
);
