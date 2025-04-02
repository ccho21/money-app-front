import { post, get, put } from '@/features/shared/api';
import {
  SubmitTransactionPayload,
  Transaction,
  TransactionCalendarItem,
  TransactionSummaryResponse,
} from './types';
import { FetchTransactionSummaryParams } from '../shared/types';

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

export const fetchTransactionSummaryAPI = async (
  params: FetchTransactionSummaryParams
) => {
  const query = new URLSearchParams();
  query.append('groupBy', params.groupBy);
  query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);
  return get<TransactionSummaryResponse>(
    `/transactions/summary?${query.toString()}`
  );
};

export const fetchTransactionCalendarAPI = async (
  year: string,
  month: string
) => {
  return get<TransactionCalendarItem[]>(
    `/transactions/calendar?year=${year}&month=${month}`
  );
};
