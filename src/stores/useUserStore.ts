// 📄 src/stores/useUserStore.ts

import { User } from '@/features/auth/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

interface UserStore {
  state: {
    user: User | null;
    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setUser: (user: User) => void;
    signin: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string) => Promise<void>;
    fetchUser: () => Promise<void>;
    signout: () => Promise<void>;
    clearError: () => void;
  };
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      state: {
        user: null,
        isLoading: false,
        error: null,
      },
      actions: {
        setUser: (user) =>
          set(
            (s) => ({
              state: { ...s.state, user },
            }),
            false,
            'auth/setUser'
          ),

        signin: async (email, password) => {
          set(
            { state: { ...get().state, isLoading: true, error: null } },
            false,
            'auth/signin:start'
          );
          try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const res = await fetch(`${BASE_URL}/auth/signin`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ email, password, timezone }),
            });

            if (!res.ok) throw new Error('로그인 실패');

            const data = await res.json();
            set(
              { state: { ...get().state, user: data, isLoading: false } },
              false,
              'auth/signin:success'
            );
            return true;
          } catch (err) {
            const msg = err instanceof Error ? err.message : '로그인 실패';
            console.error('❌ signin error:', msg);
            set(
              { state: { ...get().state, error: msg, isLoading: false } },
              false,
              'auth/signin:error'
            );
            return false;
          }
        },

        signup: async (email, password) => {
          set(
            { state: { ...get().state, isLoading: true, error: null } },
            false,
            'auth/signup:start'
          );
          try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const res = await fetch(`${BASE_URL}/auth/signup`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password, timezone }),
            });

            if (!res.ok) throw new Error('회원가입 실패');

            const result = await res.json();
            set(
              {
                state: { ...get().state, user: result.user, isLoading: false },
              },
              false,
              'auth/signup:success'
            );
          } catch (err) {
            const msg = err instanceof Error ? err.message : '회원가입 실패';
            console.error('❌ signup error:', msg);
            set(
              { state: { ...get().state, error: msg, isLoading: false } },
              false,
              'auth/signup:error'
            );
          }
        },

        fetchUser: async () => {
          set(
            { state: { ...get().state, isLoading: true, error: null } },
            false,
            'auth/fetchUser:start'
          );
          try {
            const res = await fetch(`${BASE_URL}/auth/me`, {
              method: 'GET',
              credentials: 'include',
            });

            if (!res.ok) throw new Error('사용자 정보 불러오기 실패');

            const data = await res.json();
            set(
              { state: { ...get().state, user: data, isLoading: false } },
              false,
              'auth/fetchUser:success'
            );
          } catch (err) {
            const msg = err instanceof Error ? err.message : '사용자 복원 실패';
            console.error('❌ fetchUser error:', msg);
            set(
              { state: { ...get().state, user: null, isLoading: false } },
              false,
              'auth/fetchUser:error'
            );
          }
        },

        signout: async () => {
          try {
            await fetch(`${BASE_URL}/auth/signout`, {
              method: 'POST',
              credentials: 'include',
            });
          } catch (err) {
            const msg = err instanceof Error ? err.message : '로그아웃 실패';
            console.error('❌ signout error:', msg);
          } finally {
            set(
              { state: { ...get().state, user: null } },
              false,
              'auth/signout'
            );
          }
        },

        clearError: () =>
          set(
            (s) => ({
              state: { ...s.state, error: null },
            }),
            false,
            'auth/clearError'
          ),
      },
    }),
    { name: 'useUserStore' }
  )
);
