// src/modules/auth/components/AuthGuard.test.tsx
import { render, screen } from '@testing-library/react';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { usePathname, useRouter } from 'next/navigation';
import AuthGuard from '@/modules/auth/components/AuthGuard';

// 🔧 필요한 mock 선언
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@/modules/auth/store/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

describe('AuthGuard', () => {
  const mockRouterReplace = jest.fn();

  beforeEach(() => {
    // 기본 mock router
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockRouterReplace,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to signin if user is null and path is private', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ user: null });
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(mockRouterReplace).toHaveBeenCalledWith('/auth/signin');
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render children if user is present', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { id: 'u1', email: 'test@example.com' },
    });
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(mockRouterReplace).not.toHaveBeenCalled();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should render children if route is public and user is null', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ user: null });
    (usePathname as jest.Mock).mockReturnValue('/auth/signin');

    render(
      <AuthGuard>
        <div>Public Content</div>
      </AuthGuard>
    );

    expect(mockRouterReplace).not.toHaveBeenCalled();
    expect(screen.getByText('Public Content')).toBeInTheDocument();
  });
});
