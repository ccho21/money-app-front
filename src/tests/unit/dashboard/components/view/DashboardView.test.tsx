// __tests__/DashboardView.test.tsx
import { DashboardView } from '@/modules/dashboard/components/view/DashboardView';
import { render, screen, waitFor } from '@testing-library/react';
import { useDashboard } from '@/modules/dashboard/hooks/queries';
import { useTransactionGroupsQuery } from '@/modules/transaction/hooks/queries';

jest.mock('@/modules/transaction/hooks/queries', () => ({
  useTransactionGroupsQuery: jest.fn(),
}));

jest.mock('@/modules/dashboard/hooks/queries', () => ({
  useDashboard: jest.fn(),
}));

jest.mock('@/modules/transaction/stores/filterStore', () => ({
  useTransactionFilterStore: () => ({
    query: { timeframe: 'monthly' },
    getDateRangeKey: () => '2025-06-01_2025-06-30',
  }),
}));

jest.mock('@/modules/transaction/components/view/TransactionListView', () => {
  const MockComponent = () => <div>Mocked TransactionListView</div>;
  MockComponent.displayName = 'MockedTransactionListView';
  return MockComponent;
});

jest.mock('@/modules/dashboard/components/DashboardSummary', () => {
  const MockDashboardSummary = () => <div>Mocked DashboardSummary</div>;
  MockDashboardSummary.displayName = 'MockDashboardSummary';
  return MockDashboardSummary;
});

jest.mock('@/modules/dashboard/components/InsightSection', () => {
  const MockInsightSection = () => <div>Mocked InsightSection</div>;
  MockInsightSection.displayName = 'MockInsightSection';
  return MockInsightSection;
});

describe('DashboardView', () => {
  beforeEach(() => {
    (useTransactionGroupsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
  });

  it('renders Skeleton while loading', () => {
    (useDashboard as jest.Mock).mockReturnValue({ isLoading: true });

    render(<DashboardView />);
    expect(screen.getByTestId('dashboard-loading')).toBeInTheDocument();
  });

  it('renders dashboard summary and transactions when data is ready', async () => {
    (useDashboard as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        budget: {
          used: 100,
          usageRate: 75,
          comparison: {
            percentChange: '10%',
            trend: 'increase',
          },
        },
        monthlySpending: {
          amount: 500,
          comparison: {
            percentChange: '5%',
            trend: 'decrease',
          },
        },
        categoryMonthly: [
          { name: 'Groceries', percent: 50, color: '#FF0000' },
          { name: 'Rent', percent: 30, color: '#00FF00' },
        ],
        insights: [],
      },
    });

    render(<DashboardView />);

    await waitFor(() =>
      expect(screen.getByText('Mocked DashboardSummary')).toBeInTheDocument()
    );
  });
});
