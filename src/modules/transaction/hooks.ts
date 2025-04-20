// 파일: src/modules/transaction/hooks.ts

import { handleAsync } from '@/shared/api';
import { DateFilterParams } from '@/shared/types';
import {
  createTransactionAPI,
  updateTransactionAPI,
  createTransferAPI,
  updateTransferAPI,
  deleteTransactionAPI,
  deleteTransferAPI,
  fetchTransactionByIdAPI,
  fetchTransactionSummaryAPI,
  fetchTransactionGroupAPI,
  fetchTransactionCalendarAPI,
} from './api';
import {
  TransactionCreateRequestDTO,
  TransactionUpdateRequestDTO,
  TransactionTransferRequestDTO,
} from './types';

import { useTransactionFormStore } from './formStore';
import { useTransactionStore } from './store';

// Fetch transaction by ID
export const fetchTransactionById = async (id: string) => {
  const { setSelectedTransaction, setLoading, setError } =
    useTransactionStore.getState();

  const data = await handleAsync(
    () => fetchTransactionByIdAPI(id),
    setLoading,
    setError
  );

  if (data) setSelectedTransaction(data);
  return data;
};

// Submit income/expense transaction
export const submitTransaction = async (mode: 'new' | 'edit', id?: string) => {
  const { getCreateFormData, getUpdateFormData, reset } =
    useTransactionFormStore.getState();

  try {
    if (mode === 'new') {
      const data: TransactionCreateRequestDTO = getCreateFormData();
      await createTransactionAPI(data);
    } else if (mode === 'edit') {
      if (!id) throw new Error('Missing transaction ID for update');
      const data: TransactionUpdateRequestDTO = getUpdateFormData();
      await updateTransactionAPI(id, data);
    }
    reset();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to submit transaction';
    console.error('submitTransaction error:', message);
    throw new Error(message);
  }
};

// Submit transfer transaction
export const submitTransfer = async (mode: 'new' | 'edit', id?: string) => {
  const { getTransferFormData, reset } = useTransactionFormStore.getState();

  try {
    const data: TransactionTransferRequestDTO = getTransferFormData();

    if (mode === 'new') {
      await createTransferAPI(data);
    } else if (mode === 'edit') {
      if (!id) throw new Error('Missing transfer ID for update');
      await updateTransferAPI(id, data);
    }

    reset();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to submit transfer';
    console.error('submitTransfer error:', message);
    throw new Error(message);
  }
};

// Fetch summary of grouped transactions
export const fetchTransactionSummary = async (params: DateFilterParams) => {
  const { setSummary, setLoading, setError } = useTransactionStore.getState();

  const data = await handleAsync(
    () => fetchTransactionSummaryAPI(params),
    setLoading,
    setError
  );

  if (data) setSummary(data);
};

// Fetch calendar view of transactions
export const fetchTransactionCalendar = async (params: DateFilterParams) => {
  const { setCalendar, setLoading, setError } = useTransactionStore.getState();
  const data = await handleAsync(
    () => fetchTransactionCalendarAPI(params),
    setLoading,
    setError
  );

  if (data) setCalendar(data);
};

// Fetch grouped transaction data (e.g., by day, week)
export const fetchGroupedTransactions = async (params: DateFilterParams) => {
  const { setGroupItems, setLoading, setError } =
    useTransactionStore.getState();

  const data = await handleAsync(
    () => fetchTransactionGroupAPI(params),
    setLoading,
    setError
  );

  if (data) setGroupItems(data);
};

// Delete regular transaction
export const deleteTransaction = async (id: string) => {
  await deleteTransactionAPI(id);
};

// Delete transfer transaction
export const deleteTransfer = async (id: string) => {
  await deleteTransferAPI(id);
};
