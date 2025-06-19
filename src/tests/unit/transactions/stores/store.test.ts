import { useTransactionStore } from '@/modules/transaction/stores/store';
import {
  TransactionCalendar,
  TransactionChartFlowResponse,
  TransactionGroupListResponse,
  TransactionGroupQuery,
  TransactionGroupSummary,
  TransactionItem,
} from '@/modules/transaction/types/types';
import { act } from '@testing-library/react';

describe('useTransactionStore', () => {
  beforeEach(() => {
    // 상태 초기화
    useTransactionStore.setState(useTransactionStore.getInitialState());
  });

  it('should set groupList', () => {
    const mockGroupList: TransactionGroupListResponse = {
      timeframe: 'monthly',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
      groupBy: 'date',
      groups: [],
    };

    act(() => {
      useTransactionStore.getState().setGroupList(mockGroupList);
    });

    expect(useTransactionStore.getState().groupList).toEqual(mockGroupList);
  });

  it('should set summary and update lastUpdatedAt', () => {
    const mockSummary: TransactionGroupSummary = {
      timeframe: 'monthly',
      groupBy: 'category',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
      totalIncome: 5000,
      totalExpense: 4000,
      netBalance: 1000,
    };

    act(() => {
      useTransactionStore.getState().setSummary(mockSummary);
    });

    const state = useTransactionStore.getState();
    expect(state.summary).toEqual(mockSummary);
    expect(typeof state.lastUpdatedAt).toBe('number');
  });

  it('should set calendar', () => {
    const mockCalendar: TransactionCalendar[] = [
      { date: '2025-05-01', income: 1000, expense: 500 },
    ];

    act(() => {
      useTransactionStore.getState().setCalendar(mockCalendar);
    });

    expect(useTransactionStore.getState().calendar).toEqual(mockCalendar);
  });

  it('should set chartFlow', () => {
    const mockChartFlow: TransactionChartFlowResponse = {
      timeframe: 'monthly',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
      insights: [],
      periods: [],
    };

    act(() => {
      useTransactionStore.getState().setChartFlow(mockChartFlow);
    });

    expect(useTransactionStore.getState().chartFlow).toEqual(mockChartFlow);
  });

  it('should merge filters with setFilters', () => {
    const initialFilters: TransactionGroupQuery = {
      timeframe: 'monthly',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
    };

    useTransactionStore.setState({ filters: initialFilters });

    act(() => {
      useTransactionStore.getState().setFilters({ note: 'coffee' });
    });

    expect(useTransactionStore.getState().filters).toEqual({
      ...initialFilters,
      note: 'coffee',
    });
  });

  it('should override date range with setDateRange', () => {
    const initialFilters: TransactionGroupQuery = {
      timeframe: 'monthly',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
    };

    useTransactionStore.setState({ filters: initialFilters });

    act(() => {
      useTransactionStore.getState().setDateRange('2025-06-01', '2025-06-30');
    });

    expect(useTransactionStore.getState().filters).toEqual({
      ...initialFilters,
      startDate: '2025-06-01',
      endDate: '2025-06-30',
    });
  });

  it('should set selectedTransaction', () => {
    const mockTx: TransactionItem = {
      id: 'tx1',
      amount: 100,
      type: 'expense',
      payment: 'card',
      date: '2025-05-01',
      balanceAfter: 900,
      category: { name: 'Food', icon: 'utensils', color: '#f00' },
      account: { name: 'Bank' },
    };

    act(() => {
      useTransactionStore.getState().setSelectedTransaction(mockTx);
    });

    expect(useTransactionStore.getState().selectedTransaction).toEqual(mockTx);
  });

  it('should toggle isLoading and error', () => {
    act(() => {
      useTransactionStore.getState().setLoading(true);
      useTransactionStore.getState().setError('Something went wrong');
    });

    const state = useTransactionStore.getState();
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('Something went wrong');
  });

  it('should reset state with clear', () => {
    useTransactionStore.setState({
      groupList: {
        timeframe: 'monthly',
        startDate: '',
        endDate: '',
        groupBy: 'date',
        groups: [],
      },
      summary: {
        timeframe: 'monthly',
        groupBy: 'date',
        startDate: '',
        endDate: '',
        totalIncome: 0,
        totalExpense: 0,
        netBalance: 0,
      },
      calendar: [{ date: '2025-05-01', income: 0, expense: 0 }],
      chartFlow: {
        timeframe: 'monthly',
        startDate: '',
        endDate: '',
        insights: [],
        periods: [],
      },
      selectedTransaction: {
        id: 'tx1',
        amount: 0,
        type: 'expense',
        payment: '',
        date: '',
        balanceAfter: 0,
        category: { name: '', icon: '', color: '' },
        account: { name: '' },
      },
      isLoading: true,
      error: 'error',
      lastUpdatedAt: 12345,
      filters: {
        timeframe: 'monthly',
        startDate: '',
        endDate: '',
      },
    });

    act(() => {
      useTransactionStore.getState().clear();
    });

    const state = useTransactionStore.getState();
    expect(state).toMatchObject({
      groupList: null,
      summary: null,
      calendar: [],
      chartFlow: null,
      selectedTransaction: null,
      isLoading: false,
      error: null,
      lastUpdatedAt: undefined,
    });
  });
});
