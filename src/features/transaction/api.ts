import { post, get, put, del } from '@/features/shared/api';
import {
  SubmitTransactionPayload,
  Transaction,
  TransactionCalendarItem,
  TransactionSummaryResponse,
} from './types';
import { DateFilterParams } from '../shared/types';

export const createTransactionAPI = (data: SubmitTransactionPayload) => {
  return post('/transactions', data);
};

export const updateTransactionAPI = (
  id: string,
  data: SubmitTransactionPayload
) => {
  return put(`/transactions/${id}`, data);
};
export const createTransferTransactionAPI = (
  data: SubmitTransactionPayload
) => {
  return post('/transactions/transfer', data);
};

export const updateTransferTransactionAPI = (
  id: string,
  data: SubmitTransactionPayload
) => {
  return put(`/transactions/transfer/${id}`, data);
};

export const getTransactionByIdAPI = (id: string): Promise<Transaction> => {
  return get<Transaction>(`/transactions/${id}`);
};

export const fetchTransactionsAPI = async (query: URLSearchParams) => {
  return get<Transaction[]>(`/transactions?${query.toString()}`);
};

export const fetchTransactionSummaryAPI = async (params: DateFilterParams) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);
  return get<TransactionSummaryResponse>(
    `/transactions/summary?${query.toString()}`
  );
};

export const fetchTransactionCalendarAPI = async (date: string) => {
  return get<TransactionCalendarItem[]>(`/transactions/calendar?date=${date}`);
};

export const deleteTransactionAPI = async (id: string) => {
  try {
    await del(`/transactions/${id}`);
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '삭제 실패');
  }
};
