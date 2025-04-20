// 파일: src/modules/transaction/store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  TransactionDetailDTO,
  TransactionGroupItemDTO,
  TransactionGroupSummaryDTO,
  TransactionCalendarDTO,
} from './types';

type TransactionFilters = {
  type?: 'income' | 'expense';
  categoryId?: string;
  search?: string;
  sort?: 'date' | 'amount';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
};

const defaultFilters: TransactionFilters = {
  sort: 'date',
  order: 'desc',
  page: 1,
  limit: 20,
};

interface TransactionStore {
  transactions: TransactionDetailDTO[];
  selectedTransaction: TransactionDetailDTO | undefined;
  groupItems: TransactionGroupItemDTO[];
  summary: TransactionGroupSummaryDTO | null;
  calendar: TransactionCalendarDTO[];
  filters: TransactionFilters;
  isLoading: boolean;
  error: string | null;
  lastUpdatedAt?: number;

  setTransactions: (txs: TransactionDetailDTO[]) => void;
  setSelectedTransaction: (tx: TransactionDetailDTO) => void;
  setGroupItems: (items: TransactionGroupItemDTO[]) => void;
  setSummary: (summary: TransactionGroupSummaryDTO) => void;
  setCalendar: (items: TransactionCalendarDTO[]) => void;
  setFilters: (filters: Partial<TransactionFilters>) => void;
  resetFilters: () => void;
  setDateRange: (start: string, end: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (err: string | null) => void;
  clear: () => void;
}

export const useTransactionStore = create<TransactionStore>()(
  devtools((set) => ({
    transactions: [],
    selectedTransaction: undefined,
    groupItems: [],
    summary: null,
    calendar: [],
    filters: { ...defaultFilters },
    isLoading: false,
    error: null,
    lastUpdatedAt: undefined,

    setTransactions: (txs) => set({ transactions: txs }),
    setSelectedTransaction: (tx) => set({ selectedTransaction: tx }),
    setGroupItems: (items) => set({ groupItems: items }),
    setSummary: (summary) => set({ summary, lastUpdatedAt: Date.now() }),
    setCalendar: (items) => set({ calendar: items }),
    setFilters: (filters) =>
      set((state) => ({
        filters: { ...state.filters, ...filters },
      })),
    resetFilters: () => set({ filters: { ...defaultFilters } }),
    setDateRange: (start, end) =>
      set((state) => ({
        filters: { ...state.filters, startDate: start, endDate: end },
      })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (err) => set({ error: err }),
    clear: () =>
      set({
        transactions: [],
        selectedTransaction: undefined,
        groupItems: [],
        summary: null,
        calendar: [],
        filters: { ...defaultFilters },
        isLoading: false,
        error: null,
        lastUpdatedAt: undefined,
      }),
  }))
);
