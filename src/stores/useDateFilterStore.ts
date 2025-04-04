import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { format, parseISO } from 'date-fns';
import { TransactionType } from '@/features/transaction/types';
import { RangeOption } from '@/features/shared/types';
import { formatDate } from '@/lib/date.util';

interface DateFilterState {
  date: Date; // 기준일 (Local 기준)
  range: RangeOption; // 보기 범위
  startDate?: Date; // 범위 시작
  endDate?: Date; // 범위 끝
  transactionType: TransactionType;
}

interface DateFilterActions {
  setDate: (date: Date) => void;
  setDateFromString: (dateStr: string) => void;
  getDate: () => Date;
  formatDateing: () => string;
  getYear: () => string;
  getMonth: () => string;
  setRange: (range: RangeOption) => void;
  setTransactionType: (transactionType: TransactionType) => void;
  setPeriodRange: (range: { start: Date; end: Date }) => void;
  setRangeAndDate: (newDate?: Date, newRange?: RangeOption) => void;
  getSyncedURLFromState: (withTransactionType?: boolean) => string;
  reset: () => void;
}

interface DateFilterStore {
  state: DateFilterState;
  actions: DateFilterActions;
}

export const useDateFilterStore = create<DateFilterStore>()(
  devtools(
    (set, get) => ({
      state: {
        date: new Date(),
        range: 'monthly',
        startDate: undefined,
        endDate: undefined,
        transactionType: 'expense',
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

        formatDateing: () => formatDate(get().state.date),

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

        setTransactionType: (transactionType: TransactionType) =>
          set(
            (s) => ({
              state: {
                ...s.state,
                transactionType,
              },
            }),
            false,
            'dateFilter/setTransactionType'
          ),
        getSyncedURLFromState: (withTransactionType?: boolean) => {
          const { date, range, transactionType } = get().state;
          const params = new URLSearchParams();
          params.set('date', formatDate(date));
          params.set('range', range);
          if (withTransactionType) params.set('type', transactionType);
          return `?${params.toString()}`;
        },

        reset: () =>
          set(
            () => ({
              state: {
                date: new Date(),
                range: 'monthly',
                startDate: undefined,
                endDate: undefined,
                transactionType: 'expense',
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
