import SigninPage from '@/app/auth/signin/page';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { wrapper } from '@/tests/test-utils';
import { useRouter } from 'next/navigation';
import { signin } from '@/modules/auth/hooks/hooks';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('@/modules/auth/hooks/hooks', () => ({ signin: jest.fn() }));

jest.mock('@/modules/auth/components/RedirectIfAuthenticated', () => {
  const Mock = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  Mock.displayName = 'MockRedirectIfAuthenticated';
  return {
    __esModule: true,
    default: Mock,
  };
});

jest.mock('@/modules/auth/store/useAuthStore', () => ({
  useAuthStore: () => ({ error: null }),
}));

describe('SigninPage integration', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    (signin as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submits credentials and navigates on success', async () => {
    render(<SigninPage />, { wrapper: wrapper() });

    // 🎯 "로그인" 버튼만 정확히 선택 (Google 로그인과 구분)
    const loginButton = screen.getByRole('button', { name: /^로그인$/i });
    fireEvent.click(loginButton);

    expect(signin).toHaveBeenCalledWith('seeduser@example.com', 'secure123');

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('does not navigate if signin fails', async () => {
    (signin as jest.Mock).mockResolvedValue(false);

    render(<SigninPage />, { wrapper: wrapper() });

    const loginButton = screen.getByRole('button', { name: /^로그인$/i });
    fireEvent.click(loginButton);

    expect(signin).toHaveBeenCalled();

    await waitFor(() => {
      expect(push).not.toHaveBeenCalled();
    });
  });
});
