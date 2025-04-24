import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  setAdmin: (admin: Admin | null) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      admin: null,
      isAuthenticated: !!Cookies.get('adminToken'),
      setAdmin: (admin) => set({ admin, isAuthenticated: !!admin }),
      logout: () => {
        Cookies.remove('adminToken');
        set({ admin: null, isAuthenticated: false });
      },
      checkAuth: () => {
        const token = Cookies.get('adminToken');
        const isAuthenticated = !!token;
        set({ isAuthenticated });
        return isAuthenticated;
      },
    }),
    {
      name: 'admin-auth',
      partialize: (state) => ({ admin: state.admin }),
    }
  )
);