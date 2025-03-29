import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BudgetUsageItem } from '@/features/budget/types';

interface BudgetState {
  budgetUsageItems: BudgetUsageItem[];
  isLoading: boolean;
  error: string | null;

  setBudgetUsageItems: (data: BudgetUsageItem[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

export const useBudgetStore = create<BudgetState>()(
  devtools(
    (set) => ({
      budgetUsageItems: [],
      isLoading: false,
      error: null,

      setBudgetUsageItems: (data) => set({ budgetUsageItems: data }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      clear: () =>
        set({
          budgetUsageItems: [],
          isLoading: false,
          error: null,
        }),
    }),
    { name: 'BudgetStore' }
  )
);
