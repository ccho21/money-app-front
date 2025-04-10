import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { parseISO } from 'date-fns';

import { TransactionType } from '@/features/transaction/types';
import { RangeOption } from '@/features/shared/types';
import { formatDate } from '@/lib/date.util';

interface FilterQuery {
  date: Date;
  range: RangeOption;
  transactionType: TransactionType;
}

interface FilterStore {
  query: FilterQuery;
  setQuery: (partial: Partial<FilterQuery>) => void;
  resetQuery: () => void;
  setDateFromString: (dateStr: string) => void;
  getQueryString: (withTransactionType?: boolean) => string;
}

const defaultQuery: FilterQuery = {
  date: new Date(),
  range: 'monthly',
  transactionType: 'expense',
};

export const useFilterStore = create<FilterStore>()(
  devtools(
    (set, get) => ({
      query: defaultQuery,

      setQuery: (partial) =>
        set(
          (state) => ({
            query: { ...state.query, ...partial },
          }),
          false,
          'filter/setQuery'
        ),

      resetQuery: () =>
        set({ query: defaultQuery }, false, 'filter/resetQuery'),

      setDateFromString: (dateStr) =>
        set(
          (state) => ({
            query: {
              ...state.query,
              date: parseISO(dateStr),
            },
          }),
          false,
          'filter/setDateFromString'
        ),

      getQueryString: (withTransactionType = false) => {
        const { date, range, transactionType } = get().query;
        const params = new URLSearchParams();
        params.set('date', formatDate(date));
        params.set('range', range);
        if (withTransactionType) {
          params.set('type', transactionType);
        }
        return `?${params.toString()}`;
      },
    }),
    { name: 'useFilterStore' }
  )
);
