// 📄 src/services/transaction.service.ts

import { FetchTransactionSummaryParams } from '@/features/shared/types';
import {
  createTransaction,
  fetchTransactionCalendarAPI,
  fetchTransactionsAPI,
  fetchTransactionSummaryAPI,
  updateTransaction,
  getTransactionById,
} from '@/features/transaction/api';

import {
  TransactionSummaryResponse,
} from '@/features/transaction/types';

import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import { useTransactionStore } from '@/stores/useTransactionStore';

export const fetchTransactionById = async (id: string) => {
  const {
    actions: { setSelectedTransaction, setLoading, setError },
  } = useTransactionStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await getTransactionById(id);
    setSelectedTransaction(data);
    return data;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '트랜잭션 불러오기 실패';
    setError(message);
    console.error('❌ fetchTransactionById error:', message);
  } finally {
    setLoading(false);
  }
};

export const submitTransaction = async (mode: 'new' | 'edit', id?: string) => {
  const {
    actions: { getFormData, reset },
  } = useTransactionFormStore.getState();
  const data = getFormData();

  try {
    switch (mode) {
      case 'new':
        await createTransaction(data);
        break;
      case 'edit':
        if (!id) throw new Error('수정할 거래 ID가 없습니다.');
        await updateTransaction(id, data);
        break;
      default:
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
    state: { filters },
    actions: { setFilters, setTransactions, setLoading, setError },
  } = useTransactionStore.getState();

  // 필터 초기화
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

  setLoading(true);
  setError(null);

  try {
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

    const data = await fetchTransactionsAPI(params);
    setTransactions(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '거래 데이터 조회 실패';
    console.error('❌ fetchTransactions error:', message);
    setError(message);
  } finally {
    setLoading(false);
  }
};

export const fetchTransactionSummary = async (
  params: FetchTransactionSummaryParams
) => {
  const {
    actions: { setTransactionSummary, setLoading, setError },
  } = useTransactionStore.getState();

  setLoading(true);
  setError(null);

  try {
    const res = await fetchTransactionSummaryAPI(params);
    setTransactionSummary(res);
  } catch (err) {
    const message = err instanceof Error ? err.message : '요약 데이터 오류';
    console.error('❌ fetchTransactionSummary error:', message);
    setError(message);
  } finally {
    setLoading(false);
  }
};

export const fetchTransactionCalendar = async (year: string, month: string) => {
  const {
    actions: { setCalendarItems, setLoading, setError },
  } = useTransactionStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await fetchTransactionCalendarAPI(year, month);
    setCalendarItems(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : '캘린더 데이터 오류';
    console.error('❌ fetchTransactionCalendar error:', message);
    setError(message);
  } finally {
    setLoading(false);
  }
};

export const fetchTransactionSummaryWeekly = async (
  params: FetchTransactionSummaryParams
): Promise<TransactionSummaryResponse> => {
  try {
    const res: TransactionSummaryResponse = await fetchTransactionSummaryAPI(
      params
    );
    return res;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '요약 데이터 조회 실패';
    console.error('❌ fetchTransactionSummaryWeekly error:', message);
    throw new Error(message);
  }
};
