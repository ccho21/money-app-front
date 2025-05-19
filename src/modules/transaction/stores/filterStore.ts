import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { formatDate, getDateRangeKey, parseLocalDate } from '@/lib/date.util';
import { GroupBy, Timeframe, TransactionType } from '../types/types';

interface TransactionFilterQuery {
  startDate: string;
  endDate: string;
  timeframe: Timeframe;
  groupBy: GroupBy;
  transactionType?: TransactionType;
  categoryId?: string;
  accountId?: string;
}

interface TransactionFilterStore {
  query: TransactionFilterQuery;
  isInitialized: boolean;
  setQuery: (partial: Partial<TransactionFilterQuery>) => void;
  resetQuery: () => void;
  initializeFromParams: (params: URLSearchParams) => void;
  initializeListDefaults: () => void;
  getQueryString: () => string;
  getDateRangeKey: (amount?: number) => string;
}

const defaultQuery: TransactionFilterQuery = {
  startDate: formatDate(new Date()),
  endDate: formatDate(new Date()),
  timeframe: 'monthly',
  groupBy: 'date',
};

export const useTransactionFilterStore = create<TransactionFilterStore>()(
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
          'transactionFilter/setQuery'
        ),

      resetQuery: () =>
        set(
          { query: defaultQuery, isInitialized: false },
          false,
          'transactionFilter/resetQuery'
        ),

      initializeFromParams: (params) => {
        const patch: Partial<TransactionFilterQuery> = {};
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
          endDate,
          timeframe,
          groupBy,
          transactionType,
          categoryId,
          accountId,
        } = get().query;
        const params = new URLSearchParams();
        params.set('startDate', startDate);
        params.set('endDate', endDate);
        params.set('timeframe', timeframe);
        params.set('groupBy', groupBy);
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
