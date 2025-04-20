// 파일: src/modules/transaction/api.ts

import { get, post, patch, del } from '@/shared/api';
import { buildQuery } from '@/shared/util/buildQuery';
import {
  TransactionCreateRequestDTO,
  TransactionUpdateRequestDTO,
  TransactionTransferRequestDTO,
  TransactionDetailDTO,
  TransactionGroupItemDTO,
  TransactionGroupSummaryDTO,
  TransactionCalendarDTO,
} from './types';
import type { DateFilterParams } from '@/shared/types';

// Create new income/expense transaction
export const createTransactionAPI = (payload: TransactionCreateRequestDTO) => {
  return post<TransactionDetailDTO, TransactionCreateRequestDTO>(
    '/transactions',
    payload
  );
};

// Update income/expense transaction
export const updateTransactionAPI = (
  id: string,
  payload: TransactionUpdateRequestDTO
) => {
  return patch<TransactionDetailDTO, TransactionUpdateRequestDTO>(
    `/transactions/${id}`,
    payload
  );
};

// Create transfer transaction
export const createTransferAPI = (payload: TransactionTransferRequestDTO) => {
  return post<TransactionDetailDTO, TransactionTransferRequestDTO>(
    '/transactions/transfer',
    payload
  );
};

// Update transfer transaction
export const updateTransferAPI = (
  id: string,
  payload: TransactionTransferRequestDTO
) => {
  return patch<TransactionDetailDTO, TransactionTransferRequestDTO>(
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
  return get<TransactionDetailDTO>(`/transactions/${id}`);
};

// Get grouped transactions (e.g., by date)
export const fetchTransactionGroupAPI = (payload: DateFilterParams) => {
  return post<TransactionGroupItemDTO[], DateFilterParams>(
    '/transactions/group',
    payload
  );
};

// Get calendar view
export const fetchTransactionCalendarAPI = (params: DateFilterParams) => {
  const query = buildQuery(params);
  return get<TransactionCalendarDTO[]>(`/transactions/calendar?${query}`);
};

// Get summary
export const fetchTransactionSummaryAPI = (params: DateFilterParams) => {
  const query = buildQuery(params);
  return get<TransactionGroupSummaryDTO>(`/transactions/summary?${query}`);
};
