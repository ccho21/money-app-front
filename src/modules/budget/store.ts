import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  BudgetCategoryListResponseDTO,
  BudgetGroupSummaryDTO,
} from './types';

type BudgetStoreState = {
  budgets: BudgetCategoryListResponseDTO | null;
  summary: BudgetGroupSummaryDTO | null;
  loading: boolean;
  error: string | null;
};

type BudgetStoreActions = {
  setBudgets: (budgets: BudgetCategoryListResponseDTO) => void;
  setSummary: (summary: BudgetGroupSummaryDTO) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  deleteBudgetItem: (id: string) => void;
};

export const useBudgetStore = create<BudgetStoreState & BudgetStoreActions>()(
  devtools((set, get) => ({
    budgets: null,
    summary: null,
    loading: false,
    error: null,

    setBudgets: (budgets) => set({ budgets }, false, 'budget/setBudgets'),
    setSummary: (summary) => set({ summary }, false, 'budget/setSummary'),
    setLoading: (loading) => set({ loading }, false, 'budget/setLoading'),
    setError: (error) => set({ error }, false, 'budget/setError'),

    deleteBudgetItem: (id) => {
      const current = get().budgets;
      if (!current) return;
      const updated = {
        ...current,
        items: current.items.filter((b) => b.budgetId !== id),
      };
      set({ budgets: updated }, false, 'budget/deleteBudgetItem');
    },
  }))
);
