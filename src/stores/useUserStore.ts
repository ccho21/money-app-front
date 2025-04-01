// 📄 src/stores/user/user.store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '@/features/auth/types';

interface UserStoreState {
  state: {
    user: User | null;
    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clear: () => void;
    clearError: () => void;
  };
}

export const useUserStore = create<UserStoreState>()(
  devtools(
    (set) => ({
      state: {
        user: null,
        isLoading: false,
        error: null,
      },
      actions: {
        setUser: (user) =>
          set(
            (s) => ({ state: { ...s.state, user } }),
            false,
            'user/setUser'
          ),

        setLoading: (loading) =>
          set(
            (s) => ({ state: { ...s.state, isLoading: loading } }),
            false,
            loading ? 'user/loading:start' : 'user/loading:done'
          ),

        setError: (error) =>
          set(
            (s) => ({ state: { ...s.state, error } }),
            false,
            'user/setError'
          ),

        clear: () =>
          set(
            () => ({
              state: {
                user: null,
                isLoading: false,
                error: null,
              },
            }),
            false,
            'user/clearAll'
          ),

        clearError: () =>
          set(
            (s) => ({ state: { ...s.state, error: null } }),
            false,
            'user/clearError'
          ),
      },
    }),
    { name: 'useUserStore' }
  )
);
