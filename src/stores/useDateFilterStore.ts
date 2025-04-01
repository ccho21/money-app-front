// 📄 src/stores/useDateFilterStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { format, parseISO } from 'date-fns';

export type RangeOption = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export const RANGE_OPTIONS: RangeOption[] = [
  'Daily',
  'Weekly',
  'Monthly',
  'Yearly',
];

interface DateFilterState {
  date: Date; // 기준일 (Local 기준)
  range: RangeOption; // 보기 범위
  startDate?: Date; // 범위 시작
  endDate?: Date; // 범위 끝
}

interface DateFilterActions {
  setDate: (date: Date) => void;
  setDateFromString: (dateStr: string) => void;
  getDate: () => Date;
  getDateString: () => string;
  getYear: () => string;
  getMonth: () => string;
  setRange: (range: RangeOption) => void;
  setPeriodRange: (range: { start: Date; end: Date }) => void;
  reset: () => void;
}

interface DateFilterStore {
  state: DateFilterState;
  actions: DateFilterActions;
}

// 유틸 함수
const toLocalDateString = (date: Date): string => format(date, 'yyyy-MM-dd'); // 항상 로컬 기준 문자열 반환

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

        setDateFromString: (dateStr) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                date: parseISO(dateStr),
              },
            }),
            false,
            'dateFilter/setDateFromString'
          ),

        getDate: () => get().state.date,

        getDateString: () => toLocalDateString(get().state.date),

        getYear: () => String(get().state.date.getFullYear()),

        getMonth: () =>
          String(get().state.date.getMonth() + 1).padStart(2, '0'),

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
