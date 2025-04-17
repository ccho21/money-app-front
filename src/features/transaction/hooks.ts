// 📄 src/services/transaction.service.ts

import { handleAsync } from '@/lib/api';
import { DateFilterParams } from '@/features/shared/types';
import {
  createTransactionAPI,
  fetchTransactionCalendarAPI,
  fetchTransactionsAPI,
  fetchTransactionSummaryAPI,
  updateTransactionAPI,
  getTransactionByIdAPI,
  createTransferTransactionAPI,
  updateTransferTransactionAPI,
  deleteTransactionAPI,
} from '@/features/transaction/api';

import { TransactionGroupSummaryDTO } from '@/features/transaction/types';

import { useTransactionFormStore } from '@/stores/forms/useTransactionFormStore';
import { useTransactionStore } from '@/stores/useTransactionStore';

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

export const submitTransaction = async (mode: 'new' | 'edit', id?: string) => {
  const {
    actions: { getFormData, reset },
  } = useTransactionFormStore.getState();
  const data = getFormData();

  try {
    if (mode === 'new') {
      await createTransactionAPI(data);
    } else if (mode === 'edit') {
      if (!id) throw new Error('수정할 거래 ID가 없습니다.');
      await updateTransactionAPI(id, data);
    } else {
      throw new Error(`지원하지 않는 모드: ${mode}`);
    }
    reset();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '거래 저장 중 오류 발생';
    console.error('❌ submitTransaction error:', message);
    throw new Error(message);
  }
};

export const submitTransferTransaction = async (
  mode: 'new' | 'edit',
  id?: string
) => {
  const {
    actions: { getFormData, reset },
  } = useTransactionFormStore.getState();
  const data = getFormData();

  try {
    if (mode === 'new') {
      await createTransferTransactionAPI(data);
    } else if (mode === 'edit') {
      if (!id) throw new Error('수정할 거래 ID가 없습니다.');
      await updateTransferTransactionAPI(id, data);
    } else {
      throw new Error(`지원하지 않는 모드: ${mode}`);
    }
    reset();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '거래 저장 중 오류 발생';
    console.error('❌ submitTransaction error:', message);
    throw new Error(message);
  }
};

export const fetchTransactions = async () => {
  const {
    filters,
    actions: { setFilters, setTransactions, setLoading, setError },
  } = useTransactionStore.getState();

  // ✅ 초기화 시점은 필요할 때만 고려
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
    console.warn('❗ 필수 날짜(startDate 또는 endDate)가 없습니다.');
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

// ✅ 상태 저장 없이 단독 사용
export const fetchTransactionSummaryWeekly = async (
  params: DateFilterParams
): Promise<TransactionGroupSummaryDTO> => {
  try {
    return await fetchTransactionSummaryAPI(params);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '요약 데이터 조회 실패';
    console.error('❌ fetchTransactionSummaryWeekly error:', message);
    throw new Error(message);
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    // 1. 트랜잭션 삭제 요청 (linkedTransfer 포함 처리됨)
    await deleteTransactionAPI(id);
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '삭제 실패');
  }
};
