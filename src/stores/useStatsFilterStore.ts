// 📄 src/stores/stats/statsFilter.store.ts

import { RangeOption } from '@/features/shared/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StatsFilterStore {
  state: {
    range: RangeOption;
  };
  actions: {
    setRange: (value: RangeOption) => void;
    reset: () => void;
  };
}

export const useStatsFilterStore = create<StatsFilterStore>()(
  devtools(
    (set) => ({
      state: {
        range: 'Monthly', // 초기값
      },
      actions: {
        setRange: (value) =>
          set(
            (s) => ({ state: { ...s.state, range: value } }),
            false,
            'statsFilter/setRange'
          ),
        reset: () =>
          set(
            () => ({
              state: {
                range: 'Monthly',
              },
            }),
            false,
            'statsFilter/reset'
          ),
      },
    }),
    { name: 'useStatsFilterStore' }
  )
);
