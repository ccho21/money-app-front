// 📄 src/stores/useDateFilterStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type RangeOption = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export const RANGE_OPTIONS: RangeOption[] = [
  'Daily',
  'Weekly',
  'Monthly',
  'Yearly',
];

interface DateFilterStore {
  state: {
    date: Date;
    range: RangeOption;
    startDate?: Date;
    endDate?: Date;
  };
  actions: {
    setDate: (date: Date) => void;
    getDate: () => Date;
    getYear: () => string;
    getMonth: () => string;
    setRange: (range: RangeOption) => void;
    setPeriodRange: (range: { start: Date; end: Date }) => void;
    reset: () => void;
  };
}

export const useDateFilterStore = create<DateFilterStore>()(
  devtools(
    (set, get) => ({
      state: {
        date: new Date(),
        range: 'Monthly',
        startDate: undefined,
        endDate: undefined,
      },
      actions: {
        setDate: (date) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                date,
              },
            }),
            false,
            'dateFilter/setDate'
          ),
        getDate: () => get().state.date,
        getYear: () => String(get().state.date.getFullYear()),
        getMonth: () => String(get().state.date.getMonth() + 1),

        setRange: (range) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                range,
              },
            }),
            false,
            'dateFilter/setRange'
          ),

        setPeriodRange: ({ start, end }) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                startDate: start,
                endDate: end,
              },
            }),
            false,
            'dateFilter/setPeriodRange'
          ),

        reset: () =>
          set(
            () => ({
              state: {
                date: new Date(),
                range: 'Monthly',
                startDate: undefined,
                endDate: undefined,
              },
            }),
            false,
            'dateFilter/reset'
          ),
      },
    }),
    { name: 'useDateFilterStore' }
  )
);
