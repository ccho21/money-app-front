// 📄 경로: src/stores/useUserStore.ts
import { User } from "@/features/auth/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // 로그인된 사용자 직접 설정
  setUser: (user: User) => void;

  // 로그인
  signin: (email: string, password: string) => Promise<boolean>;

  // 회원가입
  signup: (email: string, password: string) => Promise<void>;

  // 사용자 정보 복원
  fetchUser: () => Promise<void>;

  // 로그아웃
  signout: () => Promise<void>;

  // 에러 처리
  clearError: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      // 로그인된 사용자 직접 설정
      setUser: (user) => set({ user }, false, "setUser"),

      // 로그인
      signin: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // 사용자의 로컬 타임존 가져오기
          const res = await fetch(`${BASE_URL}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password, timezone }),
          });

          if (!res.ok) throw new Error("로그인 실패");

          const data = await res.json();
          set({ user: data, isLoading: false });
          return true;
        } catch (err) {
          console.error(err instanceof Error ? err.message : "로그인 실패");
          set({ error: err instanceof Error ? err.message : "로그인 실패", isLoading: false });
          return false;
        }
      },

      // 회원가입
      signup: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // 사용자의 로컬 타임존 가져오기
          const response = await fetch("/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, timezone }),
          });

          if (!response.ok) {
            throw new Error("회원가입 실패");
          }

          const result = await response.json();
          set({ user: result.user, isLoading: false });
        } catch (error) {
          if (error instanceof Error) {
            set({ error: error.message, isLoading: false });
          }
        }
      },

      // 사용자 정보 복원 (/auth/me)
      fetchUser: async () => {
        set({ isLoading: true, error: null });

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!res.ok) throw new Error("사용자 정보 불러오기 실패");

          const data = await res.json();
          set({ user: data, isLoading: false });
        } catch (err) {
          console.error(
            err instanceof Error ? err.message : "사용자 복원 실패"
          );
          set({ user: null, isLoading: false });
        }
      },

      // 로그아웃
      signout: async () => {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
            method: "POST",
            credentials: "include",
          });
        } catch (err) {
          console.error(err instanceof Error ? err.message : "로그아웃 실패");
        } finally {
          set({ user: null });
        }
      },

      // 에러 처리
      clearError: () => set({ error: null }),
    }),
    { name: "UserStore" }
  )
);
