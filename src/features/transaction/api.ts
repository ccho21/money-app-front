import { post, get, patch } from '@/features/shared/api';
import {
  FetchTransactionSummaryParams,
  SubmitTransactionPayload,
  Transaction,
  TransactionCalendarItem,
  TransactionSummaryResponse,
} from './types';

export const createTransaction = (data: SubmitTransactionPayload) => {
  return post('/transactions', data);
};

export const updateTransaction = (
  id: string,
  data: SubmitTransactionPayload
) => {
  return patch(`/transactions/${id}`, data);
};

export const getTransactionById = (id: string): Promise<Transaction> => {
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
