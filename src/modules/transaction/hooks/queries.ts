// src/modules/transaction/hooks/queries.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchTransactionChartBudgetAPI,
  fetchTransactionChartCategoryAPI,
  fetchTransactionSummaryAPI,
  fetchTransactionGroupsAPI,
  fetchTransactionCalendarAPI,
  fetchTransactionChartFlowAPI,
  fetchTransactionChartAccountAPI,
  useRecommendedKeywordsAPI,
  createTransferAPI,
  updateTransferAPI,
  createTransactionAPI,
  updateTransactionAPI,
  deleteTransactionAPI,
  deleteTransferAPI,
  fetchTransactionByIdAPI,
} from '@/modules/transaction/api';
import {
  TransactionCalendar,
  TransactionChartFlowResponse,
  TransactionCreateRequestDTO,
  TransactionDetail,
  TransactionGroupItem,
  TransactionGroupQuery,
  TransactionTransferRequestDTO,
  TransactionUpdateRequestDTO,
} from '@/modules/transaction/types/types';
import { formatDate } from '@/modules/shared/lib/date.util';
import { useTransactionFormStore } from '../stores/formStore';

export const useTransactionByIdQuery = (id?: string) => {
  return useQuery<TransactionDetail>({
    queryKey: ['transaction', id],
    queryFn: () => {
      if (!id) throw new Error('No transaction ID provided');
      return fetchTransactionByIdAPI(id);
    },
    enabled: !!id, // id should exists
    staleTime: 1000 * 60 * 5, // for 5 minutes
  });
};

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

// Chart - Flow
export function useTransactionChartFlowQuery(params: TransactionGroupQuery) {
  const { startDate, endDate, timeframe } = params;
  console.log('### params', params);
  return useQuery({
    queryKey: ['chart-flow', timeframe, startDate, endDate],
    queryFn: () => fetchTransactionChartFlowAPI(params),
    staleTime: 1000 * 60 * 5,
  });
}
// Chart - Category
export function useTransactionChartCategory(params: TransactionGroupQuery) {
  const { startDate, endDate, timeframe } = params;

  return useQuery({
    queryKey: ['transaction-chart-category', timeframe, startDate, endDate],
    queryFn: () => fetchTransactionChartCategoryAPI(params),
    staleTime: 1000 * 60 * 5,
  });
}

// Chart - Account
export const useTransactionChartAccount = (params: TransactionGroupQuery) =>
  useQuery({
    queryKey: ['chart-account', params],
    queryFn: () => fetchTransactionChartAccountAPI(params),
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

export const useRecommendedKeywords = () =>
  useQuery<string[]>({
    queryKey: ['tx-recommend-keywords'],
    queryFn: async () => {
      return await useRecommendedKeywordsAPI();
    },
    staleTime: 1000 * 60 * 30, // 30 분 캐시
  });

export const useSubmitTransactionMutation = (
  mode: 'new' | 'edit',
  id?: string
) => {
  const queryClient = useQueryClient();
  const { getCreateFormData, getUpdateFormData, reset } =
    useTransactionFormStore.getState();

  return useMutation({
    mutationFn: async () => {
      if (mode === 'new') {
        const data: TransactionCreateRequestDTO = getCreateFormData();
        return await createTransactionAPI(data);
      } else {
        if (!id) throw new Error('Missing transaction ID for update');
        const data: TransactionUpdateRequestDTO = getUpdateFormData();
        return await updateTransactionAPI(id, data);
      }
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['transaction-groups'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : 'Transaction failed';
      console.error('Transaction error:', message);
    },
  });
};

export const useSubmitTransferMutation = (
  mode: 'new' | 'edit',
  id?: string
) => {
  const queryClient = useQueryClient();
  const { getTransferFormData, reset } = useTransactionFormStore.getState();

  return useMutation({
    mutationFn: async () => {
      const data: TransactionTransferRequestDTO = getTransferFormData();
      if (mode === 'new') {
        return await createTransferAPI(data);
      } else {
        if (!id) throw new Error('Missing transfer ID for update');
        return await updateTransferAPI(id, data);
      }
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['transaction-groups'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : 'Transfer failed';
      console.error('Transfer error:', message);
    },
  });
};

export const useDeleteTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteTransactionAPI(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transaction-groups'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : 'Failed to delete transaction';
      console.error('Delete error:', message);
    },
  });
};

export const useDeleteTransferMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteTransferAPI(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transaction-groups'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : 'Failed to delete transfer';
      console.error('Delete transfer error:', message);
    },
  });
};
