import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { TransactionType } from '@/features/transaction/types';
import { RangeOption } from '@/features/shared/types';
import { formatDate, getDateRangeKey } from '@/lib/date.util';

interface FilterQuery {
  date: Date;
  range: RangeOption;
  transactionType: TransactionType;
}

interface FilterStore {
  query: FilterQuery;
  setQuery: (partial: Partial<FilterQuery>) => void;
  resetQuery: () => void;
  getQueryString: (withTransactionType?: boolean) => string;
  getDateRangeKey: (amount?: number) => string;
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

      getDateRangeKey: (amount = 0) => {
        const { date, range } = get().query;
        return getDateRangeKey(date, { unit: range, amount });
      },
    }),
    { name: 'useFilterStore' }
  )
);
