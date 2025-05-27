// stores/useInsightFilterStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { formatDate, getDateRangeKey, parseLocalDate } from '@/modules/shared/lib/date.util';
import { Timeframe } from '@/modules/transaction/types/types';

interface InsightFilterQuery {
  startDate: string;
  endDate: string;
  timeframe: Timeframe;
}

interface InsightFilterStore {
  query: InsightFilterQuery;
  isInitialized: boolean;
  setQuery: (partial: Partial<InsightFilterQuery>) => void;
  resetQuery: () => void;
  initializeFromParams: (params: URLSearchParams) => void;
  initializeDefaults: () => void;
  getQueryString: () => string;
  getDateRangeKey: (amount?: number) => string;
}

const defaultQuery: InsightFilterQuery = {
  startDate: formatDate(new Date()),
  endDate: formatDate(new Date()),
  timeframe: 'monthly',
};

export const useInsightFilterStore = create<InsightFilterStore>()(
  devtools(
    (set, get) => ({
      query: defaultQuery,
      isInitialized: false,

      setQuery: (partial) =>
        set(
          (state) => ({ query: { ...state.query, ...partial } }),
          false,
          'insightFilter/setQuery'
        ),

      resetQuery: () =>
        set(
          { query: defaultQuery, isInitialized: false },
          false,
          'insightFilter/resetQuery'
        ),

      initializeFromParams: (params) => {
        const patch: Partial<InsightFilterQuery> = {};
        const dateParam = params.get('date');
        const timeframe = params.get('timeframe');

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
            const [start, end] = getDateRangeKey(parsed, { unit: tf }).split('_');
            patch.startDate = start;
            patch.endDate = end;
          } catch (err) {
            console.warn('Invalid dateParam', err);
          }
        }

        set({
          query: { ...get().query, ...patch },
          isInitialized: true,
        });
      },

      initializeDefaults: () => {
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
        const { startDate, endDate, timeframe } = get().query;
        const params = new URLSearchParams();
        params.set('startDate', startDate);
        params.set('endDate', endDate);
        params.set('timeframe', timeframe);
        return `?${params.toString()}`;
      },

      getDateRangeKey: (amount = 0) => {
        const { startDate, timeframe } = get().query;
        const date = parseLocalDate(startDate);
        return getDateRangeKey(date, { unit: timeframe, amount });
      },
    }),
    { name: 'useInsightFilterStore' }
  )
);
