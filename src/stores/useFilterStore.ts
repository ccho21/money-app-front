import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TransactionType } from '@/modules/transaction/types';
import { GroupBy } from '@/common/types';
import { formatDate, getDateRangeKey, parseLocalDate } from '@/lib/date.util';

interface FilterQuery {
  date: Date;
  groupBy: GroupBy;
  transactionType: TransactionType;
}

interface FilterStore {
  query: FilterQuery;
  isInitialized: boolean;
  setQuery: (partial: Partial<FilterQuery>) => void;
  resetQuery: () => void;
  initializeFromParams: (params: URLSearchParams) => void;
  getQueryString: (withTransactionType?: boolean) => string;
  getDateRangeKey: (amount?: number) => string;
}

const defaultQuery: FilterQuery = {
  date: new Date(),
  groupBy: 'monthly',
  transactionType: 'expense',
};

export const useFilterStore = create<FilterStore>()(
  devtools(
    (set, get) => ({
      query: defaultQuery,
      isInitialized: false,

      setQuery: (partial) =>
        set(
          (state) => ({
            query: { ...state.query, ...partial },
          }),
          false,
          'filter/setQuery'
        ),

      resetQuery: () =>
        set({ query: defaultQuery, isInitialized: false }, false, 'filter/resetQuery'),

      initializeFromParams: (params) => {
        const patch: Partial<FilterQuery> = {};
        const dateParam = params.get('date');
        const groupByParam = params.get('groupBy');
        const typeParam = params.get('type');

        if (dateParam) {
          try {
            const parsed = parseLocalDate(dateParam);
            patch.date = parsed;
          } catch (err) {
            console.warn('Invalid dateParam', err);
          }
        }

        if (groupByParam && ['daily', 'weekly', 'monthly', 'yearly'].includes(groupByParam)) {
          patch.groupBy = groupByParam as GroupBy;
        }

        if (typeParam && ['expense', 'income'].includes(typeParam)) {
          patch.transactionType = typeParam as TransactionType;
        }

        set({
          query: { ...get().query, ...patch },
          isInitialized: true,
        });
      },

      getQueryString: (withTransactionType = false) => {
        const { date, groupBy, transactionType } = get().query;
        const params = new URLSearchParams();
        params.set('date', formatDate(date));
        params.set('groupBy', groupBy);
        if (withTransactionType) {
          params.set('type', transactionType);
        }
        return `?${params.toString()}`;
      },

      getDateRangeKey: (amount = 0) => {
        const { date, groupBy } = get().query;
        return getDateRangeKey(date, { unit: groupBy, amount });
      },
    }),
    { name: 'useFilterStore' }
  )
);
