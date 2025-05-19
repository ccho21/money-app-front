// src/modules/transaction/hooks/queries.ts

import { useQuery } from '@tanstack/react-query';
import {
  fetchTransactionChartBudgetAPI,
  fetchTransactionChartCategoryAPI,
  fetchTransactionSummaryAPI,
  fetchTransactionGroupsAPI,
  fetchTransactionCalendarAPI,
} from '@/modules/transaction/api';
import {
  TransactionCalendar,
  TransactionGroupItem,
  TransactionGroupQuery,
} from '@/modules/transaction/types/types';
import { formatDate } from '@/lib/date.util';

// Summary Query
export const useTransactionSummaryQuery = (params: TransactionGroupQuery) =>
  useQuery({
    queryKey: ['transaction-summary', params],
    queryFn: () => fetchTransactionSummaryAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5,
  });

// Groups Query
export const useTransactionGroupsQuery = (params: TransactionGroupQuery) =>
  useQuery({
    queryKey: ['transaction-groups', params],
    queryFn: () => fetchTransactionGroupsAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5,
  });

// Calendar Query
export const useTransactionCalendarQuery = (params: TransactionGroupQuery) =>
  useQuery<TransactionCalendar[]>({
    queryKey: ['transaction-calendar', params],
    queryFn: () => fetchTransactionCalendarAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5, // 5분 캐시 유지
  });

// Chart - Category
export const useTransactionChartCategory = (params: TransactionGroupQuery) =>
  useQuery({
    queryKey: ['chart-category', params],
    queryFn: () => fetchTransactionChartCategoryAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5,
  });

// Chart - Budget
export const useTransactionChartBudget = (params: TransactionGroupQuery) =>
  useQuery({
    queryKey: ['chart-budget', params],
    queryFn: () => fetchTransactionChartBudgetAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5,
  });

export const useTransactionGroupsByCalendar = (
  date: Date,
  queryParams: TransactionGroupQuery
) => {
  const dateStr = formatDate(date);

  return useQuery<TransactionGroupItem | null>({
    queryKey: [
      'transaction-groups-by-calendar',
      dateStr,
      queryParams.startDate,
      queryParams.endDate,
      queryParams.timeframe,
    ],
    queryFn: async () => {
      const res = await fetchTransactionGroupsAPI(queryParams);
      if (!res || !res.groups) throw new Error('Invalid response');
      return res.groups.find((g) => g.groupKey === dateStr) ?? null;
    },
    enabled: !!queryParams.startDate && !!queryParams.endDate,
    staleTime: 1000 * 60 * 5,
  });
};
