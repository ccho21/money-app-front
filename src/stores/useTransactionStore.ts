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

interface TransactionState {
  transactions: Transaction[];
  transactionSummaryResponse: TransactionSummaryResponse | null;
  transactionCalendarItems: TransactionCalendarItem[];

  filters: TransactionFilters;

  isLoading: boolean;
  error: string | null;

  setTransactions: (txs: Transaction[]) => void;
  setTransactionSummary: (data: TransactionSummaryResponse) => void;
  setCalendarItems: (items: TransactionCalendarItem[]) => void;

  setFilters: (filters: Partial<TransactionFilters>) => void;
  resetFilters: () => void;
  setDateRange: (start: string, end: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (err: string | null) => void;
  clear: () => void;
}

const defaultFilters: TransactionFilters = {
  sort: 'date',
  order: 'desc',
  page: 1,
  limit: 20,
};

export const useTransactionStore = create<TransactionState>()(
  devtools(
    (set) => ({
      transactions: [],
      transactionSummaryResponse: null,
      transactionCalendarItems: [],
      filters: { ...defaultFilters },
      isLoading: false,
      error: null,

      setTransactions: (txs) => set({ transactions: txs }),
      setTransactionSummary: (data) =>
        set({ transactionSummaryResponse: data }),
      setCalendarItems: (items) => set({ transactionCalendarItems: items }),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      resetFilters: () =>
        set(() => ({
          filters: { ...defaultFilters },
        })),

      setDateRange: (start, end) =>
        set((state) => ({
          filters: {
            ...state.filters,
            startDate: start,
            endDate: end,
          },
        })),

      setLoading: (isLoading) => set({ isLoading }),
      setError: (err) => set({ error: err }),

      clear: () =>
        set({
          transactions: [],
          transactionSummaryResponse: null,
          transactionCalendarItems: [],
          filters: { ...defaultFilters },
          isLoading: false,
          error: null,
        }),
    }),
    { name: 'TransactionStore' }
  )
);
