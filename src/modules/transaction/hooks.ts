import { handleAsync } from '@/shared/api';
import { DateFilterParams } from '@/shared/types';
import {
  createTransactionAPI,
  createTransferTransactionAPI,
  deleteTransactionAPI,
  fetchTransactionCalendarAPI,
  fetchTransactionsAPI,
  fetchTransactionSummaryAPI,
  getTransactionByIdAPI,
  updateTransactionAPI,
  updateTransferTransactionAPI,
} from './api';

import { TransactionGroupSummaryDTO, TransactionRequestDTO } from './types';

import { useTransactionFormStore } from '@/modules/transaction/formStore';
import { useTransactionStore } from '@/modules/transaction/store';

//
// Fetch transaction by ID and store in selectedTransaction
//
export const fetchTransactionById = async (id: string) => {
  const {
    actions: { setSelectedTransaction, setLoading, setError },
  } = useTransactionStore.getState();

  const data = await handleAsync(
    () => getTransactionByIdAPI(id),
    setLoading,
    setError
  );
  if (data) setSelectedTransaction(data);
  return data;
};

//
// Submit income/expense transaction (create or update)
//
export const submitTransaction = async (mode: 'new' | 'edit', id?: string) => {
  const {
    actions: { getCreateFormData, getUpdateFormData, reset },
  } = useTransactionFormStore.getState();

  try {
    if (mode === 'new') {
      const data: TransactionRequestDTO = getCreateFormData();
      await createTransactionAPI(data);
    } else if (mode === 'edit') {
      if (!id) throw new Error('Missing transaction ID for update');
      const data: TransactionRequestDTO = getUpdateFormData();
      await updateTransactionAPI(id, data);
    } else {
      throw new Error(`Unsupported transaction mode: ${mode}`);
    }
    reset();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to save transaction';
    console.error('submitTransaction error:', message);
    throw new Error(message);
  }
};

//
// Submit transfer transaction (create or update)
//
export const submitTransferTransaction = async (
  mode: 'new' | 'edit',
  id?: string
) => {
  const {
    actions: { getCreateFormData, getUpdateFormData, reset },
  } = useTransactionFormStore.getState();

  try {
    if (mode === 'new') {
      const data: TransactionRequestDTO = getCreateFormData();
      await createTransferTransactionAPI(data);
    } else if (mode === 'edit') {
      if (!id) throw new Error('Missing transfer ID for update');
      const data: TransactionRequestDTO = getUpdateFormData();
      await updateTransferTransactionAPI(id, data);
    } else {
      throw new Error(`Unsupported transfer mode: ${mode}`);
    }
    reset();
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : 'Failed to save transfer transaction';
    console.error('submitTransferTransaction error:', message);
    throw new Error(message);
  }
};

//
// Fetch filtered transaction list
//
export const fetchTransactions = async () => {
  const {
    filters,
    actions: { setFilters, setTransactions, setLoading, setError },
  } = useTransactionStore.getState();

  setFilters({
    type: undefined,
    categoryId: undefined,
    search: undefined,
    sort: 'date',
    order: 'desc',
    page: 1,
    limit: 20,
  });

  if (!filters.startDate || !filters.endDate) {
    console.warn('Missing required startDate or endDate');
    return;
  }

  const params = new URLSearchParams({
    startDate: filters.startDate,
    endDate: filters.endDate,
    ...(filters.type && { type: filters.type }),
    ...(filters.categoryId && { categoryId: filters.categoryId }),
    ...(filters.search && { search: filters.search }),
    ...(filters.sort && { sort: filters.sort }),
    ...(filters.order && { order: filters.order }),
    ...(filters.page && { page: String(filters.page) }),
    ...(filters.limit && { limit: String(filters.limit) }),
  });

  const data = await handleAsync(
    () => fetchTransactionsAPI(params),
    setLoading,
    setError
  );

  if (data) setTransactions(data);
};

//
// Fetch summary of grouped transactions
//
export const fetchTransactionSummary = async (params: DateFilterParams) => {
  const {
    actions: { setTransactionSummaryResponse, setLoading, setError },
  } = useTransactionStore.getState();

  const data = await handleAsync(
    () => fetchTransactionSummaryAPI(params),
    setLoading,
    setError
  );

  if (data) setTransactionSummaryResponse(data);
};

//
// Fetch transaction data for calendar view
//
export const fetchTransactionCalendar = async (date: string) => {
  const {
    actions: { setCalendarItems, setLoading, setError },
  } = useTransactionStore.getState();

  const data = await handleAsync(
    () => fetchTransactionCalendarAPI(date),
    setLoading,
    setError
  );

  if (data) setCalendarItems(data);
};

//
// Fetch weekly grouped summary directly (no state)
//
export const fetchTransactionSummaryWeekly = async (
  params: DateFilterParams
): Promise<TransactionGroupSummaryDTO> => {
  try {
    return await fetchTransactionSummaryAPI(params);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch summary';
    console.error('fetchTransactionSummaryWeekly error:', message);
    throw new Error(message);
  }
};

//
// Delete transaction by ID
//
export const deleteTransaction = async (id: string) => {
  try {
    await deleteTransactionAPI(id);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Failed to delete transaction'
    );
  }
};
