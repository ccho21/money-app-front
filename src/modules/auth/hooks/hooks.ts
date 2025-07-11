import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { signinAPI, signupAPI, fetchUserAPI, signoutAPI } from '../api';
import { QueryClient } from '@tanstack/react-query';

export const signin = async (
  email: string,
  password: string,
) => {
  const { setUser, setLoading, setError } = useAuthStore.getState();

  setLoading(true);
  setError(null);
  try {
    const user = await signinAPI({ email, password });
    setUser(user);
    return true;
  } catch {
    setError('로그인 실패');
    return false;
  } finally {
    setLoading(false);
  }
};

export const signup = async (
  email: string,
  password: string,
  timezone?: string
) => {
  const { setUser, setLoading, setError } = useAuthStore.getState();

  setLoading(true);
  setError(null);
  try {
    const user = await signupAPI({ email, password, timezone });
    setUser(user);
    return true;
  } catch {
    setError('회원가입 실패');
    return false;
  } finally {
    setLoading(false);
  }
};

export const fetchUser = async () => {
  const { setUser, setLoading, setError } = useAuthStore.getState();

  setLoading(true);
  try {
    const user = await fetchUserAPI();
    setUser(user);
  } catch {
    setUser(null);
    setError('');
  } finally {
    setLoading(false);
  }
};

export const signout = async (queryClient: QueryClient) => {
  const { setUser } = useAuthStore.getState();
  try {
    await signoutAPI();

    await queryClient.clear();
  } catch (err) {
    console.error('❌ Signout error:', err);
  } finally {
    setUser(null);
  }
};
