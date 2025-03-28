import { api } from '@/features/shared/api';
import {
  TransactionGroupResponse,
  Transaction,
  TransactionCalendarItem,
} from '@/features/transaction/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TransactionState {
  transactions: Transaction[];
  transactionGroups: TransactionGroupResponse | null;
  transactionCalendarItems: TransactionCalendarItem[];

  startDate: string;
  endDate: string;

  isLoading: boolean;
  error: string | null;

  fetchTransactions: () => Promise<void>;
  fetchTransactionGroups: (
    type: 'weekly' | 'monthly' | 'yearly',
    year: string,
    month: string
  ) => Promise<void>;
  fetchTransactionCalendar: (year: string, month: string) => Promise<void>;

  setDateRange: (start: string, end: string) => void;
  setTransactionGroups: (data: TransactionGroupResponse) => void;
  clear: () => void;
}

export const useTransactionStore = create<TransactionState>()(
  devtools(
    (set, get) => ({
      transactions: [],
      groupedTransactions: null,
      transactionCalendarItem: null,
      startDate: '',
      endDate: '',

      isLoading: false,
      error: null,
      setTransactionGroups: (data) =>
        set({ transactionGroups: data }, false, 'setGroupedTransactions'),

      setDateRange: (start, end) =>
        set({ startDate: start, endDate: end }, false, 'setDateRange'),

      // 개별 거래 리스트 불러오기
      fetchTransactions: async () => {
        const { startDate, endDate } = get();

        if (!startDate || !endDate) {
          console.warn('startDate 또는 endDate가 설정되지 않았습니다.');
          return;
        }

        set(
          { isLoading: true, error: null },
          false,
          'fetchTransactions:loading'
        );

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/transactions?startDate=${startDate}&endDate=${endDate}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );

          if (!res.ok) throw new Error('거래 내역 불러오기 실패');

          const data = await res.json();
          set(
            { transactions: data, isLoading: false },
            false,
            'fetchTransactions:success'
          );
        } catch (err) {
          set(
            {
              isLoading: false,
              error: err instanceof Error ? err.message : '거래 불러오기 오류',
            },
            false,
            'fetchTransactions:error'
          );
        }
      },

      // 그룹 요약 데이터 불러오기
      fetchTransactionGroups: async (
        type: string,
        year: string,
        month: string
      ) => {
        set(
          { isLoading: true, error: null },
          false,
          'fetchTransactionGroups:loading'
        );

        try {
          const res: TransactionGroupResponse =
            await api<TransactionGroupResponse>(
              `/transactions/grouped?type=${type}&year=${year}&month=${month}`,
              { method: 'GET' }
            );

          if (!res) throw new Error('그룹 요약 데이터 불러오기 실패');

          set(
            { transactionGroups: res, isLoading: false },
            false,
            'fetchTransactionGroups:success'
          );
        } catch (err) {
          set(
            {
              isLoading: false,
              error: err instanceof Error ? err.message : '요약 데이터 오류',
            },
            false,
            'fetchTransactionGroups:error'
          );
        }
      },
      fetchTransactionCalendar: async (year: string, month: string) => {
        set(
          { isLoading: true, error: null },
          false,
          'fetchTransactionCalendar:loading'
        );

        try {
          const res = await api<TransactionCalendarItem[]>(
            `/transactions/calendar?year=${year}&month=${month}`,
            { method: 'GET' }
          );

          set(
            { transactionCalendarItems: res, isLoading: false },
            false,
            'fetchTransactionCalendar:success'
          );
        } catch (err) {
          set(
            {
              isLoading: false,
              error: err instanceof Error ? err.message : '캘린더 데이터 오류',
            },
            false,
            'fetchTransactionCalendar:error'
          );
        }
      },

      // 상태 초기화 (예: 로그아웃 시)
      clear: () =>
        set(
          {
            transactions: [],
            transactionGroups: null,
            startDate: '',
            endDate: '',
            isLoading: false,
            error: null,
          },
          false,
          'clearTransactionState'
        ),
    }),
    { name: 'TransactionStore' }
  )
);
