// 파일: src/modules/transaction/store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  TransactionCalendar,
  TransactionChartFlowResponse,
  TransactionGroupListResponse,
  TransactionGroupQuery,
  TransactionGroupSummary,
  TransactionItem,
} from '../types/types';

interface TransactionStore {
  // 🔸 상태
  groupList: TransactionGroupListResponse | null;
  summary: TransactionGroupSummary | null;
  selectedTransaction: TransactionItem | null;
  calendar: TransactionCalendar[] | [];
  chartFlow: TransactionChartFlowResponse | null;

  // 🔸 필터
  filters: TransactionGroupQuery;
  lastUpdatedAt?: number;

  // 🔸 상태 처리
  isLoading: boolean;
  error: string | null;

  // 🔸 actions
  setGroupList: (items: TransactionGroupListResponse) => void;
  setCalendar: (items: TransactionCalendar[]) => void;
  setSummary: (summary: TransactionGroupSummary) => void;
  setChartFlow: (chartFlow: TransactionChartFlowResponse) => void;
  setFilters: (filters: Partial<TransactionGroupQuery>) => void;
  resetFilters: () => void;
  setSelectedTransaction: (tx: TransactionItem | null) => void;
  setDateRange: (start: string, end: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (err: string | null) => void;
  clear: () => void;
}

export const useTransactionStore = create<TransactionStore>()(
  devtools((set) => ({
    groupList: null,
    summary: null,
    selectedTransaction: null,
    isLoading: false,
    error: null,
    lastUpdatedAt: undefined,

    setGroupList: (list) => set({ groupList: list }),
    setSummary: (summary) => set({ summary, lastUpdatedAt: Date.now() }),
    setCalendar: (items) => set({ calendar: items }),
    setChartFlow: (flow) => set({ chartFlow: flow }),

    setFilters: (filters) =>
      set((state) => ({
        filters: { ...state.filters, ...filters },
      })),

    setDateRange: (start, end) =>
      set((state) => ({
        filters: { ...state.filters, startDate: start, endDate: end },
      })),

    setSelectedTransaction: (tx) => set({ selectedTransaction: tx }),

    setLoading: (loading) => set({ isLoading: loading }),
    setError: (err) => set({ error: err }),

    clear: () =>
      set({
        summary: null,
        groupList: null,
        calendar: [],
        chartFlow: null,
        selectedTransaction: null,
        isLoading: false,
        error: null,
        lastUpdatedAt: undefined,
      }),
  }))
);
