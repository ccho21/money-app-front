import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupPage from '@/app/auth/signup/page';
import { useRouter } from 'next/navigation';
import { signup } from '@/modules/auth/hooks/hooks';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/modules/auth/hooks/hooks', () => ({
  signup: jest.fn(),
}));

jest.mock('@/modules/auth/store/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

describe('SignupPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ error: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls signup and redirects on success', async () => {
    (signup as jest.Mock).mockResolvedValue(true);

    render(<SignupPage />);

    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith('seeduser@example.com', 'secure123');
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('renders heading', () => {
    render(<SignupPage />);
    expect(screen.getByRole('heading', { name: '회원가입' })).toBeInTheDocument();
  });
});