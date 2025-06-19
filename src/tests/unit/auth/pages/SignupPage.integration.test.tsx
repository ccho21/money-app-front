import SignupPage from '@/app/auth/signup/page';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { wrapper } from '@/tests/test-utils';
import { useRouter } from 'next/navigation';
import { signup } from '@/modules/auth/hooks/hooks';
import { ReactNode } from 'react';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('@/modules/auth/hooks/hooks', () => ({ signup: jest.fn() }));
jest.mock('@/modules/auth/components/RedirectIfAuthenticated', () => {
  const MockRedirectIfAuthenticated = ({
    children,
  }: {
    children: ReactNode;
  }) => <>{children}</>;
  MockRedirectIfAuthenticated.displayName = 'MockRedirectIfAuthenticated';
  return {
    __esModule: true,
    default: MockRedirectIfAuthenticated,
  };
});

jest.mock('@/modules/auth/store/useAuthStore', () => ({
  useAuthStore: () => ({ error: null }),
}));

describe('SignupPage integration', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    (signup as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submits and redirects to signin', async () => {
    render(<SignupPage />, { wrapper: wrapper() });

    fireEvent.click(screen.getByRole('button', { name: /회원가입/i }));

    expect(signup).toHaveBeenCalledWith('seeduser@example.com', 'secure123');
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('does not redirect on failure', async () => {
    (signup as jest.Mock).mockResolvedValue(false);

    render(<SignupPage />, { wrapper: wrapper() });

    fireEvent.click(screen.getByRole('button', { name: /회원가입/i }));

    expect(signup).toHaveBeenCalled();
    await waitFor(() => {
      expect(push).not.toHaveBeenCalled();
    });
  });
});
