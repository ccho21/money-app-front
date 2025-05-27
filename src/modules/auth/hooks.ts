import { useUserStore } from '@/modules/shared/stores/useUserStore';
import { signinAPI, signupAPI, fetchUserAPI, signoutAPI } from './api';

export const signin = async (email: string, password: string) => {
  const { setUser, setLoading, setError } = useUserStore.getState();

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

export const signup = async (email: string, password: string) => {
  const { setUser, setLoading, setError } = useUserStore.getState();

  setLoading(true);
  setError(null);
  try {
    const user = await signupAPI({ email, password });
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
  const { setUser, setLoading, setError } = useUserStore.getState();

  setLoading(true);
  try {
    const user = await fetchUserAPI();
    setUser(user);
  } catch {
    setUser(null);
    setError('세션 복원 실패');
  } finally {
    setLoading(false);
  }
};

export const signout = async () => {
  const { setUser } = useUserStore.getState();
  try {
    await signoutAPI();
  } catch (err) {
    console.error('❌ Signout error:', err);
  } finally {
    setUser(null);
  }

  return { fetchUser, signout };
};
