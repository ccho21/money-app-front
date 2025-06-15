// 📄 src/stores/user/user.store.ts

import { User } from '@/modules/auth/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }, false, 'auth/setUser'),

      setLoading: (isLoading) =>
        set(
          { isLoading },
          false,
          isLoading ? 'auth/loading:start' : 'auth/loading:done'
        ),

      setError: (error) => set({ error }, false, 'auth/setError'),

      clear: () =>
        set(
          { user: null, isLoading: false, error: null },
          false,
          'auth/clearAll'
        ),

      clearError: () => set(() => ({ error: null }), false, 'user/clearError'),
    }),
    { name: 'useAuthStore' }
  )
);
