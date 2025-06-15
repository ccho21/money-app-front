// src/modules/main/components/__tests__/ClientShell.test.tsx
import useAuthRedirectSync from '@/modules/auth/hooks/useAuthRedirectSync';
import ClientShell from '@/modules/main/components/ClientShell';
import { render, screen } from '@testing-library/react';

jest.mock('@/modules/auth/hooks/useAuthRedirectSync', () => ({
  default: jest.fn(),
}));

jest.mock('@/modules/shared/hooks/budgetAlert', () => ({
  useBudgetAlert: jest.fn(),
}));

jest.mock('@/modules/auth/components/AuthGuard', () => {
  const MockAuthGuard = (props: { children: React.ReactNode }) => (
    <div>AuthGuard: {props.children}</div>
  );
  MockAuthGuard.displayName = 'MockAuthGuard';
  return {
    __esModule: true,
    default: MockAuthGuard,
  };
});

jest.mock('@/providers/RouteTracker', () => {
  const MockRouteTracker = () => <div>RouteTracker</div>;
  MockRouteTracker.displayName = 'MockRouteTracker';
  return {
    __esModule: true,
    default: MockRouteTracker,
  };
});

jest.mock('@/providers/ThemeProvider', () => {
  const MockThemeProvider = (props: { children: React.ReactNode }) => (
    <div>ThemeProvider: {props.children}</div>
  );
  MockThemeProvider.displayName = 'MockThemeProvider';
  return {
    __esModule: true,
    ThemeProvider: MockThemeProvider,
  };
});

jest.mock('@/components/navigation/BottomNav', () => {
  const MockBottomNav = () => <div>BottomNav</div>;
  MockBottomNav.displayName = 'MockBottomNav';
  return {
    __esModule: true,
    default: MockBottomNav,
  };
});

jest.mock('@/modules/auth/hooks/useAuthRedirectSync', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ClientShell', () => {
  const mockUseAuthRedirectSync = useAuthRedirectSync as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading screen if loading is true', () => {
    mockUseAuthRedirectSync.mockReturnValue(true);

    render(<ClientShell>Page Content</ClientShell>);

    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
    expect(screen.queryByText('Page Content')).not.toBeInTheDocument();
  });

  it('renders children and layout when loading is false', () => {
    mockUseAuthRedirectSync.mockReturnValue(false);

    render(<ClientShell>Page Content</ClientShell>);

    expect(screen.getByText('AuthGuard:')).toBeInTheDocument();
    expect(screen.getByText('RouteTracker')).toBeInTheDocument();
    expect(screen.getByText('ThemeProvider:')).toBeInTheDocument();
    expect(screen.getByText('BottomNav')).toBeInTheDocument();
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });
});
