// 📄 src/stores/user/user.store.ts

import { User } from '@/modules/auth/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
  clearError: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }, false, 'user/setUser'),

      setLoading: (isLoading) =>
        set(
          { isLoading },
          false,
          isLoading ? 'user/loading:start' : 'user/loading:done'
        ),

      setError: (error) => set({ error }, false, 'user/setError'),

      clear: () =>
        set(
          { user: null, isLoading: false, error: null },
          false,
          'user/clearAll'
        ),

      clearError: () => set(() => ({ error: null }), false, 'user/clearError'),
    }),
    { name: 'useUserStore' }
  )
);
