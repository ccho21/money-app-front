import { renderHook, waitFor } from '@testing-library/react';
import {
  useBudgetsByCategory,
  useGroupedBudgetCategory,
  useCreateBudgetCategory,
  useUpdateBudgetCategory,
} from '@/modules/budget/hooks/queries';

import * as BudgetAPI from '@/modules/budget/api';

import type {
  BudgetCategoryListResponse,
  BudgetGroupItem,
  BudgetCategoryCreateRequest,
  BudgetQuery,
} from '@/modules/budget/types/types';
import { createTestQueryClient, wrapper } from '@/tests/test-utils';

jest.mock('@/modules/budget/api');

describe('budget queries', () => {
  const client = createTestQueryClient();
  const testWrapper = wrapper(client);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches budgets by category', async () => {
    const dummy: BudgetCategoryListResponse = {
      total: 1,
      items: [
        {
          categoryId: 'food',
          categoryName: 'Food',
          icon: '🍔',
          amount: 300,
          used: 120,
          remaining: 180,
          isOver: false,
          type: 'expense',
          budgetId: 'a1',
        },
      ],
    };

    (BudgetAPI.fetchBudgetByCategoryAPI as jest.Mock).mockResolvedValueOnce(
      dummy
    );

    const params: BudgetQuery = {
      startDate: '2025-06-01',
      endDate: '2025-06-30',
    };

    const { result } = renderHook(() => useBudgetsByCategory(params), {
      wrapper: testWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(dummy);
  });

  it('fetches grouped budget category', async () => {
    const dummy: BudgetGroupItem = {
      categoryId: 'food',
      categoryName: 'Food',
      type: 'expense',
      icon: '🍔',
      totalBudget: 300,
      totalUsed: 120,
      totalRemaining: 180,
      isOver: false,
      budgets: [],
    };

    (
      BudgetAPI.fetchGroupedBudgetCategoryAPI as jest.Mock
    ).mockResolvedValueOnce(dummy);

    const { result } = renderHook(
      () =>
        useGroupedBudgetCategory(
          'food',
          { startDate: '2025-06-01', endDate: '2025-06-30' },
          true
        ),
      { wrapper: testWrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(dummy);
  });

  it('creates budget category and normalizes amount', async () => {
    const mockFn = BudgetAPI.createBudgetCategoryAPI as jest.Mock;
    mockFn.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useCreateBudgetCategory(), {
      wrapper: testWrapper,
    });

    const input: BudgetCategoryCreateRequest = {
      categoryId: 'c1',
      amount: '123.45',
      startDate: '2025-06-01',
      endDate: '2025-06-30',
    };

    result.current.mutate(input);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledWith({
        ...input,
        amount: 123.45,
      });
    });
  });

  it('updates budget category', async () => {
    const mockFn = BudgetAPI.updateBudgetCategoryAPI as jest.Mock;
    mockFn.mockResolvedValue({ updated: true });

    const { result } = renderHook(() => useUpdateBudgetCategory(), {
      wrapper: testWrapper,
    });

    result.current.mutate({
      id: 'budget123',
      data: {
        amount: 500,
        startDate: '2025-06-01',
      },
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledWith('budget123', {
        amount: 500,
        startDate: '2025-06-01',
      });
    });
  });
});
