import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { formatLocalDateString, getDateRangeKey, parseLocalDate } from '@/modules/shared/util/date.util';
import {
  GroupBy,
  Timeframe,
  TransactionGroupQuery,
  TransactionType,
} from '../types/types';

interface TransactionFilterStore {
  query: TransactionGroupQuery;
  isInitialized: boolean;
  setQuery: (
    fn: (prev: TransactionGroupQuery) => Partial<TransactionGroupQuery>
  ) => void;
  resetQuery: () => void;
  initializeFromParams: (params: URLSearchParams) => void;
  initializeListDefaults: () => void;
  getQueryString: () => string;
  getDateRangeKey: (amount?: number) => string;
}

const defaultQuery: TransactionGroupQuery = {
  startDate: formatLocalDateString(new Date()),
  endDate: formatLocalDateString(new Date()),
  timeframe: 'monthly',
  groupBy: 'date',
};

export const useTransactionFilterStore = create<TransactionFilterStore>()(
  devtools(
    (set, get) => ({
      query: defaultQuery,
      isInitialized: false,

      setQuery: (fn) => {
        set(
          (state) => {
            const patch = fn(state.query);
            const hasChange = Object.entries(patch).some(
              ([key, val]) =>
                val !== state.query[key as keyof TransactionGroupQuery]
            );

            return {
              query: {
                ...state.query,
                ...patch,
                version: hasChange ? Date.now() : state.query.version,
              },
            };
          },
          false,
          'transactionFilter/setQuery'
        );
      },
      resetQuery: () =>
        set(
          { query: defaultQuery, isInitialized: false },
          false,
          'transactionFilter/resetQuery'
        ),

      initializeFromParams: (params) => {
        const patch: Partial<TransactionGroupQuery> = {};
        const dateParam = params.get('date');
        const timeframe = params.get('timeframe');
        const groupBy = params.get('groupBy');
        const type = params.get('type');
        const category = params.get('categoryId');
        const account = params.get('accountId');

        if (
          timeframe &&
          ['daily', 'weekly', 'monthly', 'yearly', 'custom'].includes(timeframe)
        ) {
          patch.timeframe = timeframe as Timeframe;
        }

        if (dateParam) {
          try {
            const parsed = parseLocalDate(dateParam);
            const tf = patch.timeframe ?? get().query.timeframe;
            const [start, end] = getDateRangeKey(parsed, { unit: tf }).split(
              '_'
            );
            patch.startDate = start;
            patch.endDate = end;
          } catch (err) {
            console.warn('Invalid dateParam', err);
          }
        }

        if (
          groupBy &&
          ['date', 'category', 'account', 'tag', 'budget', 'note'].includes(
            groupBy
          )
        ) {
          patch.groupBy = groupBy as GroupBy;
        }

        if (type && ['income', 'expense', 'transfer'].includes(type)) {
          patch.transactionType = type as TransactionType;
        }

        if (category) patch.categoryId = category;
        if (account) patch.accountId = account;

        set({
          query: { ...get().query, ...patch },
          isInitialized: true,
        });
      },

      initializeListDefaults: () => {
        const current = get().query;
        const timeframe = current.timeframe ?? 'monthly';
        const today = new Date();
        const [startDate, endDate] = getDateRangeKey(today, {
          unit: timeframe,
        }).split('_');

        set({
          query: {
            ...current,
            timeframe,
            startDate,
            endDate,
          },
          isInitialized: true,
        });
      },

      getQueryString: () => {
        const {
          startDate,
          timeframe,
          groupBy,
          transactionType,
          categoryId,
          accountId,
        } = get().query;
        const params = new URLSearchParams();
        // get the start date as standard
        params.set('date', startDate);
        params.set('timeframe', timeframe);
        if (groupBy) params.set('groupBy', groupBy);
        if (transactionType) params.set('type', transactionType);
        if (categoryId) params.set('categoryId', categoryId);
        if (accountId) params.set('accountId', accountId);
        return `?${params.toString()}`;
      },

      getDateRangeKey: (amount = 0) => {
        const { startDate, timeframe } = get().query;
        const date = parseLocalDate(startDate);
        return getDateRangeKey(date, { unit: timeframe, amount });
      },
    }),
    { name: 'useTransactionFilterStore' }
  )
);
