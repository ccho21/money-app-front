import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  BudgetCategoryListResponseDTO,
  BudgetSummaryDTO,
  BudgetCategoryPeriodItemDTO,
} from '../types/types';

type BudgetState = {
  budgets: BudgetCategoryListResponseDTO | null;
  summary: BudgetSummaryDTO | null;
  selectedBudget: BudgetCategoryPeriodItemDTO | null;
};

type BudgetActions = {
  setBudgets: (budgets: BudgetCategoryListResponseDTO) => void;
  setSummary: (summary: BudgetSummaryDTO) => void;
  setSelectedBudget: (budget: BudgetCategoryPeriodItemDTO) => void;
  deleteBudgetItem: (id: string) => void;
  reset: () => void;
};

export const useBudgetStore = create<BudgetState & BudgetActions>()(
  devtools((set, get) => ({
    budgets: null,
    summary: null,
    selectedBudget: null,

    setBudgets: (budgets) => set({ budgets }, false, 'budget/setBudgets'),
    setSummary: (summary) => set({ summary }, false, 'budget/setSummary'),

    setSelectedBudget: (budget) =>
      set({ selectedBudget: budget }, false, 'budget/setSelectedBudget'),

    deleteBudgetItem: (id) => {
      const current = get().budgets;
      if (!current) return;
      const updated = {
        ...current,
        items: current.items.filter((b) => b.budgetId !== id),
      };
      set({ budgets: updated }, false, 'budget/deleteBudgetItem');
    },

    reset: () =>
      set(
        {
          budgets: null,
          summary: null,
          selectedBudget: null,
        },
        false,
        'budget/resetAll'
      ),
  }))
);
