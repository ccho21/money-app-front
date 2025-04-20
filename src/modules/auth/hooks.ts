// 📄 src/features/auth/services/authService.ts

import { get } from '@/common/api';
import { useUserStore } from '@/stores/useUserStore';
import { User } from './types';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const signin = async (
  email: string,
  password: string
): Promise<boolean> => {
  const {
    actions: { setUser, setLoading, setError },
  } = useUserStore.getState();

  setLoading(true);
  setError(null);

  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, timezone }),
    });

    if (!res.ok) throw new Error('로그인 실패');

    const data: User = await res.json();
    setUser(data);
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : '로그인 실패';
    setError(msg);
    return false;
  } finally {
    setLoading(false);
  }
};

export const signup = async (
  email: string,
  password: string
): Promise<boolean> => {
  const {
    actions: { setUser, setLoading, setError },
  } = useUserStore.getState();

  setLoading(true);
  setError(null);

  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, timezone }),
    });

    if (!res.ok) throw new Error('회원가입 실패');

    const data: { user: User } = await res.json();
    setUser(data.user);
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : '회원가입 실패';
    setError(msg);
    return false;
  } finally {
    setLoading(false);
  }
};

export const fetchUser = async (): Promise<void> => {
  const {
    actions: { setUser, setLoading, setError },
  } = useUserStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await get<User>('/auth/me');
    setUser(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : '사용자 복원 실패';
    setUser(null); // 세션 만료 시 null 처리
    setError(msg);
  } finally {
    setLoading(false);
  }
};

export const signout = async (): Promise<void> => {
  const {
    actions: { setUser },
  } = useUserStore.getState();

  try {
    await fetch(`${BASE_URL}/auth/signout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (err) {
    console.error('❌ signout error:', err);
  } finally {
    setUser(null);
  }
};
