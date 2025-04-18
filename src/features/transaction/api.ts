import { post, get, put, del } from '@/lib/api';
import {
  TransactionRequestDTO,
  TransactionDetailDTO,
  TransactionCalendarDTO,
  TransactionGroupSummaryDTO,
} from './types';
import { DateFilterParams } from '../shared/types';

//
// [POST] Create income/expense transaction
// Path: /transactions
//
export const createTransactionAPI = (data: TransactionRequestDTO) => {
  return post('/transactions', data);
};

//
// [PATCH] Update income/expense transaction
// Path: /transactions/:id
//
export const updateTransactionAPI = (
  id: string,
  data: TransactionRequestDTO
) => {
  return put(`/transactions/${id}`, data);
};

//
// [POST] Create transfer transaction
// Path: /transactions/transfer
//
export const createTransferTransactionAPI = (data: TransactionRequestDTO) => {
  return post('/transactions/transfer', data);
};

//
// [PATCH] Update transfer transaction
// Path: /transactions/transfer/:id
//
export const updateTransferTransactionAPI = (
  id: string,
  data: TransactionRequestDTO
) => {
  return put(`/transactions/transfer/${id}`, data);
};

//
// [GET] Get transaction by ID
//
export const getTransactionByIdAPI = (
  id: string
): Promise<TransactionDetailDTO> => {
  return get<TransactionDetailDTO>(`/transactions/${id}`);
};

//
// [GET] Fetch transaction list with filters
//
export const fetchTransactionsAPI = async (query: URLSearchParams) => {
  return get<TransactionDetailDTO[]>(`/transactions?${query.toString()}`);
};

//
// [GET] Get transaction summary for a groupBy
//
export const fetchTransactionSummaryAPI = async (params: DateFilterParams) => {
  const query = new URLSearchParams();
  query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);
  if (params.groupBy) query.append('groupBy', params.groupBy);

  return get<TransactionGroupSummaryDTO>(
    `/transactions/summary?${query.toString()}`
  );
};

//
// [GET] Get calendar view of transactions by date
//
export const fetchTransactionCalendarAPI = async (date: string) => {
  return get<TransactionCalendarDTO[]>(`/transactions/calendar?date=${date}`);
};

//
// [DELETE] Delete a transaction
//
export const deleteTransactionAPI = async (id: string) => {
  try {
    await del(`/transactions/${id}`);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Failed to delete transaction'
    );
  }
};
