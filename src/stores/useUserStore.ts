import { User } from '@/features/auth/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,

      // 로그인된 사용자 직접 설정
      setUser: (user) => set({ user }, false, 'setUser'),

      // 로그인
      signin: async (email, password) => {
        try {
          const res = await fetch(`${BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) throw new Error('로그인 실패');

          const data = await res.json();
          set({ user: data }, false, 'signin');
          return true;
        } catch (err) {
          console.error(err instanceof Error ? err.message : '로그인 실패');
          return false;
        }
      },

      // 사용자 정보 복원 (/auth/me)
      fetchUser: async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );
          if (!res.ok) throw new Error('사용자 정보 불러오기 실패');

          const data = await res.json();
          set({ user: data }, false, 'fetchUser');
        } catch (err) {
          console.error(
            err instanceof Error ? err.message : '사용자 복원 실패'
          );
          set({ user: null });
        }
      },

      // 로그아웃
      signout: async () => {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
            method: 'POST',
            credentials: 'include',
          });
        } catch (err) {
          console.error(err instanceof Error ? err.message : '로그아웃 실패');
        } finally {
          set({ user: null });
        }
      },
    }),
    { name: 'UserStore' }
  )
);
