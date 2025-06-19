// src/components/common/RedirectIfAuthenticated.test.tsx
import { render, screen } from '@testing-library/react';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { useRouter } from 'next/navigation';
import RedirectIfAuthenticated from '@/modules/auth/components/RedirectIfAuthenticated';

// 🔧 mock 설정
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/modules/auth/store/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

describe('RedirectIfAuthenticated', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect if user is authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { id: '1', email: 'test@example.com' },
    });

    render(
      <RedirectIfAuthenticated>
        <div>Auth Page</div>
      </RedirectIfAuthenticated>
    );

    expect(mockReplace).toHaveBeenCalledWith('/dashboard');
    expect(screen.queryByText('Auth Page')).not.toBeInTheDocument();
  });

  it('should render children if user is not authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ user: null });

    render(
      <RedirectIfAuthenticated>
        <div>Auth Page</div>
      </RedirectIfAuthenticated>
    );

    expect(mockReplace).not.toHaveBeenCalled();
    expect(screen.getByText('Auth Page')).toBeInTheDocument();
  });
});
