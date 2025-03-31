// 📄 src/stores/budget/budget.store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BudgetUsageItem } from '@/features/budget/types';

interface BudgetStore {
  state: {
    budgetUsageItems: BudgetUsageItem[];
    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setBudgetUsageItems: (data: BudgetUsageItem[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clear: () => void;
  };
}

export const useBudgetStore = create<BudgetStore>()(
  devtools(
    (set) => ({
      state: {
        budgetUsageItems: [],
        isLoading: false,
        error: null,
      },
      actions: {
        setBudgetUsageItems: (data) =>
          set(
            (s) => ({
              state: { ...s.state, budgetUsageItems: data },
            }),
            false,
            'budget/setUsageItems'
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
                budgetUsageItems: [],
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
