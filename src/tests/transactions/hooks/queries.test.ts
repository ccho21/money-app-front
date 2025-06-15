// src/tests/transactions/hooks/queries.test.ts
import { renderHook, act, waitFor } from '@testing-library/react';
import {
  useTransactionByIdQuery,
  useTransactionGroupsByCalendar,
  useSubmitTransferMutation,
  useDeleteTransactionMutation,
  useTransactionSummaryQuery,
  useSubmitTransactionMutation,
} from '@/modules/transaction/hooks/queries';
import * as api from '@/modules/transaction/api';
import { useTransactionFormStore } from '@/modules/transaction/stores/formStore';
import { wrapper, createTestQueryClient } from '@/tests/test-utils';
import { parseLocalDate } from '@/modules/shared/util/date.util';

jest.mock('@/modules/transaction/api');
jest.mock('@/modules/transaction/stores/formStore');

describe('useTransactionSummaryQuery', () => {
  it('calls API and returns data', async () => {
    const mockData = { total: 1000, income: 600, expense: 400 };
    (api.fetchTransactionSummaryAPI as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(
      () =>
        useTransactionSummaryQuery({
          startDate: '2025-01-01',
          endDate: '2025-01-31',
          timeframe: 'monthly',
          groupBy: 'date',
        }),
      {
        wrapper: wrapper(),
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });
});

describe('useSubmitTransactionMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTransactionFormStore.getState as jest.Mock).mockReturnValue({
      getCreateFormData: () => ({ amount: 100 }),
      getUpdateFormData: () => ({ amount: 200 }),
      reset: jest.fn(),
    });
  });

  it('calls createTransactionAPI when mode is "new"', async () => {
    (api.createTransactionAPI as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { result } = renderHook(() => useSubmitTransactionMutation('new'), {
      wrapper: wrapper(createTestQueryClient()),
    });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(api.createTransactionAPI).toHaveBeenCalledWith({ amount: 100 });
  });

  it('calls updateTransactionAPI when mode is "edit"', async () => {
    (api.updateTransactionAPI as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { result } = renderHook(
      () => useSubmitTransactionMutation('edit', 'tx-123'),
      { wrapper: wrapper(createTestQueryClient()) }
    );

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(api.updateTransactionAPI).toHaveBeenCalledWith('tx-123', {
      amount: 200,
    });
  });
});

describe('transaction queries (integrated)', () => {
  const queryClient = createTestQueryClient();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTransactionFormStore.getState as jest.Mock).mockReturnValue({
      getTransferFormData: () => ({ from: 'A', to: 'B', amount: 500 }),
      reset: jest.fn(),
    });
  });

  it('useTransactionByIdQuery returns data', async () => {
    (api.fetchTransactionByIdAPI as jest.Mock).mockResolvedValue({
      id: 'tx-1',
      amount: 100,
    });

    const { result } = renderHook(() => useTransactionByIdQuery('tx-1'), {
      wrapper: wrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ id: 'tx-1', amount: 100 });
  });

  it('useTransactionGroupsByCalendar returns group by date', async () => {
    (api.fetchTransactionGroupsAPI as jest.Mock).mockResolvedValue({
      groups: [{ groupKey: '2025-06-01', items: [{ id: 'tx1' }] }],
    });

    const { result } = renderHook(
      () =>
        useTransactionGroupsByCalendar(parseLocalDate('2025-06-01'), {
          startDate: '2025-06-01',
          endDate: '2025-06-30',
          timeframe: 'monthly',
          groupBy: 'date',
        }),
      {
        wrapper: wrapper(queryClient),
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({
      groupKey: '2025-06-01',
      items: [{ id: 'tx1' }],
    });
  });

  it('useSubmitTransferMutation calls createTransferAPI', async () => {
    (api.createTransferAPI as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useSubmitTransferMutation('new'), {
      wrapper: wrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(api.createTransferAPI).toHaveBeenCalledWith({
      from: 'A',
      to: 'B',
      amount: 500,
    });
  });

  it('useDeleteTransactionMutation deletes transaction', async () => {
    (api.deleteTransactionAPI as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { result } = renderHook(() => useDeleteTransactionMutation(), {
      wrapper: wrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync('tx-delete-id');
    });

    expect(api.deleteTransactionAPI).toHaveBeenCalledWith('tx-delete-id');
  });
});
