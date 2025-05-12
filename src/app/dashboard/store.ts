// 파일: src/modules/dashboard/store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type DashboardSummary = {
  income: number;
  expense: number;
  balance: number;
};

type DashboardTransaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  categoryId: string;
};

interface DashboardStore {
  summary: DashboardSummary | null;
  recentTransactions: DashboardTransaction[];
  selectedMonth: string; // e.g. '2025-05'
  isLoading: boolean;
  error: string | null;

  setSummary: (s: DashboardSummary) => void;
  setRecentTransactions: (txs: DashboardTransaction[]) => void;
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
