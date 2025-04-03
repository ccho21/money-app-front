// 📄 src/stores/budget/budget.store.ts

import { Budget, BudgetSummaryResponse } from '@/features/budget/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BudgetStoreState {
  budgets: Budget[];
  budgetSummaryResponse?: BudgetSummaryResponse;
  isLoading: boolean;
  error: string | null;
}

interface BudgetStoreActions {
  setBudgets: (data: Budget[]) => void;
  setBudgetSummaryResponse: (data: BudgetSummaryResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

interface BudgetStore {
  state: BudgetStoreState;
  actions: BudgetStoreActions;
}

export const useBudgetStore = create<BudgetStore>()(
  devtools(
    (set) => ({
      state: {
        budgets: [],
        budgetSummaryResponse: undefined,
        isLoading: false,
        error: null,
      },
      actions: {
        setBudgets: (data) =>
          set(
            (s) => ({
              state: { ...s.state, budgets: data },
            }),
            false,
            'budget/setBudgets'
          ),

        setBudgetSummaryResponse: (data) =>
          set(
            (s) => ({
              state: { ...s.state, budgetSummaryResponse: data },
            }),
            false,
            'budget/setBudgetSummaryResponse'
          ),

        setLoading: (loading) =>
          set(
            (s) => ({
              state: { ...s.state, isLoading: loading },
            }),
            false,
            loading ? 'ui/loading:start' : 'ui/loading:done'
          ),

        setError: (error) =>
          set(
            (s) => ({
              state: { ...s.state, error },
            }),
            false,
            'ui/setError'
          ),

        clear: () =>
          set(
            () => ({
              state: {
                budgets: [],
                budgetSummaryResponse: undefined,
                isLoading: false,
                error: null,
              },
            }),
            false,
            'budget/clearAll'
          ),
      },
    }),
    { name: 'useBudgetStore' }
  )
);
