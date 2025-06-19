import { render, screen, waitFor } from '@testing-library/react';
import { useTopNavPreset } from '@/modules/shared/hooks/topNavPreset';
import DashboardShell from '@/modules/dashboard/components/view/DashboardShell';

jest.mock('@/modules/shared/hooks/topNavPreset', () => ({
  __esModule: true,
  useTopNavPreset: jest.fn(),
}));

jest.mock('@/components/navigation/TopNav', () => {
  const MockTopNav = () => <div>MockTopNav</div>;
  MockTopNav.displayName = 'MockTopNav';
  return {
    __esModule: true,
    default: MockTopNav,
  };
});

describe('DashboardShell', () => {
  const mockTopNavPreset = useTopNavPreset as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders TopNav and children', async () => {
    render(
      <DashboardShell>
        <div>Dashboard Content</div>
      </DashboardShell>
    );

    await waitFor(() => {
      expect(screen.getByText('MockTopNav')).toBeInTheDocument();
      expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
    });
  });

  it('calls useTopNavPreset with correct config', () => {
    render(
      <DashboardShell>
        <div />
      </DashboardShell>
    );
    expect(mockTopNavPreset).toHaveBeenCalledWith({ title: 'Dashboard' });
  });
});
