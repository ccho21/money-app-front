import { renderHook, waitFor } from '@testing-library/react';
import useAuthRedirectSync from '@/modules/auth/hooks/useAuthRedirectSync';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { fetchUser } from '@/modules/auth/hooks/hooks';
import { usePathname, useRouter } from 'next/navigation';

jest.mock('@/modules/auth/store/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('@/modules/auth/hooks/hooks', () => ({
  fetchUser: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('useAuthRedirectSync', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });

    // suppress console.error during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    (console.error as jest.Mock).mockRestore();
  });

  it('should redirect to /dashboard if user is present and on public path', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ user: { id: 'u1' } });
    (usePathname as jest.Mock).mockReturnValue('/auth/signin');

    const { result } = renderHook(() => useAuthRedirectSync());

    await waitFor(() => {
      expect(result.current).toBe(false);
      expect(mockReplace).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should do nothing if user is present and path is private', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ user: { id: 'u1' } });
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    const { result } = renderHook(() => useAuthRedirectSync());

    await waitFor(() => {
      expect(result.current).toBe(false);
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  it('should call fetchUser and set loading false on success', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ user: null });
    (usePathname as jest.Mock).mockReturnValue('/auth/signup');
    (fetchUser as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useAuthRedirectSync());

    await waitFor(() => {
      expect(fetchUser).toHaveBeenCalled();
      expect(result.current).toBe(false);
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  it('should redirect to /auth/signin if fetchUser fails on private path', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ user: null });
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
    (fetchUser as jest.Mock).mockRejectedValue(new Error('no session'));

    const { result } = renderHook(() => useAuthRedirectSync());

    await waitFor(() => {
      expect(fetchUser).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith('/auth/signin');
      expect(result.current).toBe(false);
    });
  });

  it('should not redirect if fetchUser fails on public path', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ user: null });
    (usePathname as jest.Mock).mockReturnValue('/auth/signin');
    (fetchUser as jest.Mock).mockRejectedValue(new Error('no session'));

    const { result } = renderHook(() => useAuthRedirectSync());

    await waitFor(() => {
      expect(fetchUser).toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
      expect(result.current).toBe(false);
    });
  });
});
