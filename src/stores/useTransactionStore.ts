// 📄 src/stores/transaction/transaction.store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  Transaction,
  TransactionSummaryResponse,
  TransactionCalendarItem,
} from '@/features/transaction/types';

interface TransactionFilters {
  type?: 'income' | 'expense';
  categoryId?: string;
  search?: string;
  sort?: 'date' | 'amount';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

const defaultFilters: TransactionFilters = {
  sort: 'date',
  order: 'desc',
  page: 1,
  limit: 20,
};

interface TransactionStoreState {
  state: {
    transactions: Transaction[];
    selectedTransaction?: Transaction;
    transactionSummaryResponse: TransactionSummaryResponse | null;
    transactionCalendarItems: TransactionCalendarItem[];
    filters: TransactionFilters;
    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setTransactions: (txs: Transaction[]) => void;
    setSelectedTransaction: (tx: Transaction) => void;
    setTransactionSummary: (data: TransactionSummaryResponse) => void;
    setCalendarItems: (items: TransactionCalendarItem[]) => void;
    setFilters: (filters: Partial<TransactionFilters>) => void;
    resetFilters: () => void;
    setDateRange: (start: string, end: string) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (err: string | null) => void;
    clear: () => void;
  };
}

export const useTransactionStore = create<TransactionStoreState>()(
  devtools(
    (set) => ({
      state: {
        transactions: [],
        selectedTransaction: undefined,
        transactionSummaryResponse: null,
        transactionCalendarItems: [],
        filters: { ...defaultFilters },
        isLoading: false,
        error: null,
      },
      actions: {
        setTransactions: (txs) =>
          set(
            (s) => ({
              state: { ...s.state, transactions: txs },
            }),
            false,
            'transactions/set'
          ),
        setSelectedTransaction: (tx) =>
          set(
            (s) => ({
              state: { ...s.state, selectedTransaction: tx },
            }),
            false,
            'transactions/selectOne'
          ),
        setTransactionSummary: (data) =>
          set(
            (s) => ({
              state: { ...s.state, transactionSummaryResponse: data },
            }),
            false,
            'summary/set'
          ),
        setCalendarItems: (items) =>
          set(
            (s) => ({
              state: { ...s.state, transactionCalendarItems: items },
            }),
            false,
            'calendar/setItems'
          ),
        setFilters: (filters) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                filters: { ...s.state.filters, ...filters },
              },
            }),
            false,
            'filters/updatePartial'
          ),
        resetFilters: () =>
          set(
            (s) => ({
              state: { ...s.state, filters: { ...defaultFilters } },
            }),
            false,
            'filters/reset'
          ),
        setDateRange: (start, end) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                filters: {
                  ...s.state.filters,
                  startDate: start,
                  endDate: end,
                },
              },
            }),
            false,
            'filters/setDateRange'
          ),
        setLoading: (isLoading) =>
          set(
            (s) => ({
              state: { ...s.state, isLoading },
            }),
            false,
            isLoading ? 'ui/loading:start' : 'ui/loading:done'
          ),
        setError: (err) =>
          set(
            (s) => ({
              state: { ...s.state, error: err },
            }),
            false,
            'ui/setError'
          ),
        clear: () =>
          set(
            () => ({
              state: {
                transactions: [],
                selectedTransaction: undefined,
                transactionSummaryResponse: null,
                transactionCalendarItems: [],
                filters: { ...defaultFilters },
                isLoading: false,
                error: null,
              },
            }),
            false,
            'transactions/clearAll'
          ),
      },
    }),
    { name: 'useTransactionStore' }
  )
);
