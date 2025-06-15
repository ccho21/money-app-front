// src/modules/auth/hooks/__tests__/authActions.test.ts

import {
  fetchUserAPI,
  signinAPI,
  signoutAPI,
  signupAPI,
} from '@/modules/auth/api';
import { fetchUser, signin, signout, signup } from '@/modules/auth/hooks/hooks';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

jest.mock('@/modules/auth/api');
jest.mock('@/modules/auth/store/useAuthStore', () => ({
  useAuthStore: {
    getState: jest.fn(),
  },
}));

describe('auth actions', () => {
  const setUser = jest.fn();
  const setLoading = jest.fn();
  const setError = jest.fn();

  beforeEach(() => {
    (useAuthStore.getState as jest.Mock).mockReturnValue({
      setUser,
      setLoading,
      setError,
    });

    jest.clearAllMocks();
  });

  describe('signin', () => {
    it('calls setUser on success', async () => {
      (signinAPI as jest.Mock).mockResolvedValue({
        id: 'u1',
        email: 'a@test.com',
      });

      const result = await signin('a@test.com', '1234');

      expect(setLoading).toHaveBeenCalledWith(true);
      expect(setError).toHaveBeenCalledWith(null);
      expect(signinAPI).toHaveBeenCalledWith({
        email: 'a@test.com',
        password: '1234',
      });
      expect(setUser).toHaveBeenCalledWith({ id: 'u1', email: 'a@test.com' });
      expect(setLoading).toHaveBeenCalledWith(false);
      expect(result).toBe(true);
    });

    it('calls setError on failure', async () => {
      (signinAPI as jest.Mock).mockRejectedValue(new Error('fail'));

      const result = await signin('fail@test.com', 'wrong');

      expect(setError).toHaveBeenCalledWith('로그인 실패');
      expect(setLoading).toHaveBeenCalledWith(false);
      expect(result).toBe(false);
    });
  });

  describe('signup', () => {
    it('calls setUser on success', async () => {
      (signupAPI as jest.Mock).mockResolvedValue({
        id: 'u2',
        email: 'b@test.com',
      });

      const result = await signup('b@test.com', 'abcd');

      expect(setUser).toHaveBeenCalledWith({ id: 'u2', email: 'b@test.com' });
      expect(result).toBe(true);
    });

    it('calls setError on failure', async () => {
      (signupAPI as jest.Mock).mockRejectedValue(new Error('signup failed'));

      const result = await signup('x@test.com', 'fail');

      expect(setError).toHaveBeenCalledWith('회원가입 실패');
      expect(result).toBe(false);
    });
  });

  describe('fetchUser', () => {
    it('calls setUser on success', async () => {
      (fetchUserAPI as jest.Mock).mockResolvedValue({
        id: 'u3',
        email: 'c@test.com',
      });

      await fetchUser();

      expect(setUser).toHaveBeenCalledWith({ id: 'u3', email: 'c@test.com' });
    });

    it('handles error and sets user to null', async () => {
      (fetchUserAPI as jest.Mock).mockRejectedValue(
        new Error('not authenticated')
      );

      await fetchUser();

      expect(setUser).toHaveBeenCalledWith(null);
      expect(setError).toHaveBeenCalledWith('세션 복원 실패');
    });
  });

  describe('signout', () => {
    it('calls setUser(null) on success', async () => {
      (signoutAPI as jest.Mock).mockResolvedValue(undefined);

      await signout();

      expect(setUser).toHaveBeenCalledWith(null);
    });

    it('logs error if signout fails', async () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (signoutAPI as jest.Mock).mockRejectedValue(new Error('signout failed'));

      await signout();

      expect(console.error).toHaveBeenCalledWith(
        '❌ Signout error:',
        expect.any(Error)
      );
      expect(setUser).toHaveBeenCalledWith(null);

      spy.mockRestore();
    });
  });
});
