// src/modules/dashboard/store.test.ts

import { useDashboardStore } from '@/modules/dashboard/stores/store';
import { TransactionItem } from '@/modules/transaction/types/types';

describe('useDashboardStore', () => {
  beforeEach(() => {
    useDashboardStore.setState({
      summary: null,
      recentTransactions: [],
      selectedMonth: '2025-05',
      isLoading: false,
      error: null,
    });
  });

  it('sets summary correctly', () => {
    const mockSummary = { income: 1000, expense: 500, balance: 500 };
    useDashboardStore.getState().setSummary(mockSummary);
    expect(useDashboardStore.getState().summary).toEqual(mockSummary);
  });

  it('sets recent transactions correctly', () => {
    const txs: TransactionItem[] = [
      {
        id: 'tx1',
        note: 'Morning coffee',
        description: 'Starbucks americano',
        amount: 5.25,
        payment: 'card',
        date: '2025-05-01T08:30:00.000Z',
        type: 'expense',
        category: {
          name: 'Food & Drink',
          icon: 'utensils',
          color: '#FF6B6B',
        },
        account: {
          name: 'Toss Card',
        },
        balanceAfter: 945.75,
      },
      {
        id: 'tx2',
        description: 'May salary',
        amount: 3000,
        payment: 'bank',
        date: '2025-05-01T00:00:00.000Z',
        type: 'income',
        category: {
          name: 'Salary',
          icon: 'briefcase',
          color: '#4ECDC4',
        },
        account: {
          name: 'Woori Bank',
        },
        balanceAfter: 3945.75,
      },
      {
        id: 'tx3',
        note: 'Transfer to savings',
        amount: 500,
        payment: 'bank',
        date: '2025-05-02T10:00:00.000Z',
        type: 'transfer',
        recurringId: 'rec-001',
        category: null,
        account: {
          name: 'Woori Bank',
        },
        balanceAfter: 3445.75,
      },
    ];
    useDashboardStore.getState().setRecentTransactions(txs);
    expect(useDashboardStore.getState().recentTransactions).toEqual(txs);
  });

  it('sets selected month', () => {
    useDashboardStore.getState().setMonth('2025-06');
    expect(useDashboardStore.getState().selectedMonth).toBe('2025-06');
  });

  it('sets loading state', () => {
    useDashboardStore.getState().setLoading(true);
    expect(useDashboardStore.getState().isLoading).toBe(true);
    useDashboardStore.getState().setLoading(false);
    expect(useDashboardStore.getState().isLoading).toBe(false);
  });

  it('sets error message', () => {
    useDashboardStore.getState().setError('Something went wrong');
    expect(useDashboardStore.getState().error).toBe('Something went wrong');
  });

  it('clears the store state', () => {
    // set some fake state
    useDashboardStore.setState({
      summary: { income: 1, expense: 2, balance: 3 },
      recentTransactions: [
        {
          id: 'tx3',
          note: 'Transfer to savings',
          amount: 500,
          payment: 'bank',
          date: '2025-05-02T10:00:00.000Z',
          type: 'transfer',
          recurringId: 'rec-001',
          category: null,
          account: {
            name: 'Woori Bank',
          },
          balanceAfter: 3445.75,
        },
      ],
      selectedMonth: '1999-01',
      isLoading: true,
      error: 'error',
    });

    useDashboardStore.getState().clear();

    const state = useDashboardStore.getState();
    expect(state.summary).toBeNull();
    expect(state.recentTransactions).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.selectedMonth).toMatch(/^\d{4}-\d{2}$/); // ISO month format
  });
});
