// src/stores/user/user.store.test.ts

import { useAuthStore } from '@/modules/auth/store/useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isLoading: false,
      error: null,
    });
  });

  it('should set user', () => {
    const mockUser = { id: 'u1', email: 'test@example.com' };
    useAuthStore.getState().setUser(mockUser);
    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it('should set loading state correctly', () => {
    useAuthStore.getState().setLoading(true);
    expect(useAuthStore.getState().isLoading).toBe(true);

    useAuthStore.getState().setLoading(false);
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it('should set error', () => {
    useAuthStore.getState().setError('Something went wrong');
    expect(useAuthStore.getState().error).toBe('Something went wrong');
  });

  it('should clear all state with clear()', () => {
    useAuthStore.setState({
      user: { id: 'u2', email: 'abc@test.com' },
      isLoading: true,
      error: 'some error',
    });

    useAuthStore.getState().clear();

    expect(useAuthStore.getState()).toMatchObject({
      user: null,
      isLoading: false,
      error: null,
    });
  });

  it('should clear error only', () => {
    useAuthStore.setState({ error: 'bad request' });
    useAuthStore.getState().clearError();
    expect(useAuthStore.getState().error).toBeNull();
  });
});
