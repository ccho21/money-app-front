// 파일: src/modules/dashboard/store.ts

import { TransactionItem } from '@/modules/transaction/types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type DashboardSummary = {
  income: number;
  expense: number;
  balance: number;
};

interface DashboardStore {
  summary: DashboardSummary | null;
  recentTransactions: TransactionItem[];
  selectedMonth: string; // e.g. '2025-05'
  isLoading: boolean;
  error: string | null;

  setSummary: (s: DashboardSummary) => void;
  setRecentTransactions: (txs: TransactionItem[]) => void;
  setMonth: (month: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

export const useDashboardStore = create<DashboardStore>()(
  devtools((set) => ({
    summary: null,
    recentTransactions: [],
    selectedMonth: new Date().toISOString().slice(0, 7), // default to current month
    isLoading: false,
    error: null,

    setSummary: (s) => set({ summary: s }),
    setRecentTransactions: (txs) => set({ recentTransactions: txs }),
    setMonth: (month) => set({ selectedMonth: month }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    clear: () =>
      set({
        summary: null,
        recentTransactions: [],
        selectedMonth: new Date().toISOString().slice(0, 7),
        isLoading: false,
        error: null,
      }),
  }))
);
