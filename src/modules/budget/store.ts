// 파일: src/modules/budget/store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BudgetCategoryPeriodItemDTO, BudgetCategoryItemDTO } from './types';

interface BudgetStoreState {
  budgetCategoryResponse: BudgetCategoryPeriodItemDTO[];
  budgetSettings: BudgetCategoryItemDTO[];
  isLoading: boolean;
  error: string | null;

  setBudgetCategoryResponse: (data: BudgetCategoryPeriodItemDTO[]) => void;
  setBudgetSettings: (data: BudgetCategoryItemDTO[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

export const useBudgetStore = create<BudgetStoreState>()(
  devtools((set) => ({
    budgetCategoryResponse: [],
    budgetSettings: [],
    isLoading: false,
    error: null,

    setBudgetCategoryResponse: (data) => set({ budgetCategoryResponse: data }),
    setBudgetSettings: (data) => set({ budgetSettings: data }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clear: () =>
      set({
        budgetCategoryResponse: [],
        budgetSettings: [],
        isLoading: false,
        error: null,
      }),
  }))
);
