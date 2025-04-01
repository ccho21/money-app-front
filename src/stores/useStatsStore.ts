// 📄 src/stores/stats/stats.store.ts

import { BudgetUsage } from '@/features/budget/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StatsStore {
  state: {
    items: BudgetUsage[];
    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setItems: (data: BudgetUsage[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clear: () => void;
  };
}

export const useStatsStore = create<StatsStore>()(
  devtools(
    (set) => ({
      state: {
        items: [],
        isLoading: false,
        error: null,
      },
      actions: {
        setItems: (data) =>
          set(
            (s) => ({
              state: { ...s.state, items: data },
            }),
            false,
            'stats/setItems'
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
                items: [],
                isLoading: false,
                error: null,
              },
            }),
            false,
            'stats/clearAll'
          ),
      },
    }),
    { name: 'useStatsStore' }
  )
);
