import { post, put, get } from '@/features/shared/api';
import {
  FetchTransactionSummaryParams,
  Transaction,
  TransactionCalendarItem,
  TransactionSummaryResponse,
} from './types';

export const createTransaction = (data: any) => {
  return post('/transactions', data);
};

export const updateTransaction = (id: string, data: any) => {
  return put(`/transactions/${id}`, data);
};

export const getTransactionById = (id: string) => {
  return get(`/transactions/${id}`);
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
