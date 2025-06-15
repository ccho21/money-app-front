// 파일: src/modules/transaction/api.ts

import { get, post, patch, del } from '@/modules/shared/common/api';

import { buildTransactionQuery } from './utils/buildTransactionQuery';
import {
  TransactionCalendar,
  TransactionChartAccountResponse,
  TransactionChartBudgetResponse,
  TransactionChartCategoryResponse,
  TransactionChartFlowResponse,
  TransactionCreateRequestDTO,
  TransactionDetail,
  TransactionGroupListResponse,
  TransactionGroupQuery,
  TransactionGroupSummary,
  TransactionTransferRequestDTO,
  TransactionUpdateRequestDTO,
} from './types/types';

// Create new income/expense transaction
export const createTransactionAPI = (payload: TransactionCreateRequestDTO) => {
  return post<TransactionDetail, TransactionCreateRequestDTO>(
    '/transactions',
    payload
  );
};

// Update income/expense transaction
export const updateTransactionAPI = (
  id: string,
  payload: TransactionUpdateRequestDTO
) => {
  return patch<TransactionDetail, TransactionUpdateRequestDTO>(
    `/transactions/${id}`,
    payload
  );
};

// Create transfer transaction
export const createTransferAPI = (payload: TransactionTransferRequestDTO) => {
  return post<TransactionDetail, TransactionTransferRequestDTO>(
    '/transactions/transfer',
    payload
  );
};

// Update transfer transaction
export const updateTransferAPI = (
  id: string,
  payload: TransactionTransferRequestDTO
) => {
  return patch<TransactionDetail, TransactionTransferRequestDTO>(
    `/transactions/transfer/${id}`,
    payload
  );
};

// Delete income/expense transaction
export const deleteTransactionAPI = (id: string) => {
  return del<void>(`/transactions/${id}`);
};

// Delete transfer transaction
export const deleteTransferAPI = (id: string) => {
  return del<void>(`/transactions/transfer/${id}`);
};

// Get transaction by ID
export const fetchTransactionByIdAPI = (id: string) => {
  return get<TransactionDetail>(`/transactions/${id}`);
};

// Get summary
export const fetchTransactionSummaryAPI = (params: TransactionGroupQuery) => {
  const query = buildTransactionQuery(params);
  return get<TransactionGroupSummary>(`/transactions/summary?${query}`);
};

// Get calendar view
export const fetchTransactionCalendarAPI = (params: TransactionGroupQuery) => {
  const query = buildTransactionQuery(params);
  return get<TransactionCalendar[]>(`/transactions/calendar?${query}`);
};

// Get grouped transactions (e.g., by date)
export const fetchTransactionGroupsAPI = (params: TransactionGroupQuery) => {
  const query = buildTransactionQuery(params);
  return get<TransactionGroupListResponse>(`/transactions/groups?${query}`);
};

export const fetchTransactionChartFlowAPI = (params: TransactionGroupQuery) => {
  const query = buildTransactionQuery(params);
  console.log('QQQ QUERY', query);
  return get<TransactionChartFlowResponse>(
    `/transactions/charts/flow?${query}`
  );
};

export const fetchTransactionChartCategoryAPI = (
  params: TransactionGroupQuery
) => {
  const query = buildTransactionQuery(params);
  return get<TransactionChartCategoryResponse>(
    `/transactions/charts/category?${query}`
  );
};

export const fetchTransactionChartAccountAPI = (
  params: TransactionGroupQuery
) => {
  const query = buildTransactionQuery(params);
  return get<TransactionChartAccountResponse>(
    `/transactions/charts/account?${query}`
  );
};

export const fetchTransactionChartBudgetAPI = (
  params: TransactionGroupQuery
) => {
  const query = buildTransactionQuery(params);
  return get<TransactionChartBudgetResponse>(
    `/transactions/charts/budget?${query}`
  );
};

export const fetchRecommendedKeywordsAPI = () => {
  return get<string[]>(`/transactions/keyword/recommendations`);
};
