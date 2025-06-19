import { fetchDashboardAPI } from '@/modules/dashboard/api';
import { useDashboard } from '@/modules/dashboard/hooks/queries';
import { wrapper } from '@/tests/test-utils';
import { renderHook, waitFor } from '@testing-library/react';
import type { DashboardDTO } from '@/modules/dashboard/types/types';
import { Insight } from '@/modules/insights/types/types';

jest.mock('@/modules/dashboard/api', () => ({
  fetchDashboardAPI: jest.fn(),
}));

const mockInsights: Insight[] = [
  {
    id: 'insight-002',
    title: 'You are close to exceeding your food budget',
    description: 'You have used 92% of your food budget this month.',
    type: 'budget',
    severity: 'critical',
    createdAt: '2025-05-28T09:00:00Z',
    icon: 'alertTriangle',
    entityRef: {
      type: 'budget',
      id: 'budget-food',
    },
    actionLabel: 'View Budget',
    actionUrl: '/budget',
  },
];

const mockDashboardData: DashboardDTO = {
  balance: 1200,
  budget: {
    used: 800,
    total: 1000,
    usageRate: 80,
    comparison: {
      previousUsageRate: 65,
      difference: 15,
      percentChange: '15.0%',
      trend: 'increase',
    },
  },
  monthlySpending: {
    amount: 800,
    comparison: {
      previousAmount: 700,
      difference: 100,
      percentChange: '14.3%',
      trend: 'increase',
    },
  },
  categoryMonthly: [
    {
      categoryId: 'c1',
      name: 'Food',
      percent: 35,
      color: '#FF6B6B',
    },
  ],
  insights: mockInsights,
};

describe('useDashboard', () => {
  const validParams = {
    startDate: '2025-05-01',
    endDate: '2025-05-31',
    timeframe: 'monthly' as const,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls fetchDashboardAPI when params are valid', async () => {
    (fetchDashboardAPI as jest.Mock).mockResolvedValue(mockDashboardData);

    const { result } = renderHook(() => useDashboard(validParams), {
      wrapper: wrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetchDashboardAPI).toHaveBeenCalledWith(validParams);
    expect(result.current.data).toEqual(mockDashboardData);
  });

  it('does not fetch if startDate or endDate is missing', () => {
    const { result } = renderHook(
      () => useDashboard({ ...validParams, startDate: '' }),
      { wrapper: wrapper() }
    );

    expect(result.current.fetchStatus).toBe('idle');
  });
});
