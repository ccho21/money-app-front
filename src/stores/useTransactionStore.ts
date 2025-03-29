import { api } from "@/features/shared/api";
import {
  FetchTransactionSummaryParams,
  Transaction,
  TransactionCalendarItem,
  TransactionSummaryResponse,
} from "@/features/transaction/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TransactionState {
  transactions: Transaction[];
  transactionSummaryResponse: TransactionSummaryResponse | null;
  transactionCalendarItems: TransactionCalendarItem[];

  filters: {
    type?: "income" | "expense";
    categoryId?: string;
    search?: string;
    sort?: "date" | "amount";
    order?: "asc" | "desc";
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
  };

  isLoading: boolean;
  error: string | null;

  fetchTransactions: () => Promise<void>;
  fetchTransactionSummary: ({
    groupBy,
    startDate,
    endDate,
  }: FetchTransactionSummaryParams) => Promise<void>;
  fetchTransactionCalendar: (year: string, month: string) => Promise<void>;

  setDateRange: (start: string, end: string) => void;
  setTransactionSummary: (data: TransactionSummaryResponse) => void;
  setFilters: (filters: Partial<TransactionState["filters"]>) => void;
  resetFilters: () => void;
  clear: () => void;
}

const defaultFilters: TransactionState["filters"] = {
  sort: "date",
  order: "desc",
  page: 1,
  limit: 20,
};

export const useTransactionStore = create<TransactionState>()(
  devtools(
    (set, get) => ({
      transactions: [],
      transactionSummaryResponse: null,
      transactionCalendarItems: [],

      filters: { ...defaultFilters },

      isLoading: false,
      error: null,

      setTransactionSummary: (data) =>
        set(
          { transactionSummaryResponse: data },
          false,
          "setTransactionSummary"
        ),

      setFilters: (filters) =>
        set(
          (state) => ({ filters: { ...state.filters, ...filters } }),
          false,
          "setFilters"
        ),

      resetFilters: () =>
        set({ filters: { ...defaultFilters } }, false, "resetFilters"),

      // ✅ 거래 리스트 API (필터는 매번 리셋)
      fetchTransactions: async () => {
        // ✅ 필터 초기화 (매번 초기화되게 처리)
        set(
          (state) => ({
            filters: {
              ...state.filters,
              type: undefined,
              categoryId: undefined,
              search: undefined,
              sort: "date",
              order: "desc",
              page: 1,
              limit: 20,
              startDate: state.filters.startDate, // 기존 날짜 유지
              endDate: state.filters.endDate,
            },
          }),
          false,
          "fetchTransactions:resetFilters"
        );

        const { filters } = get();

        if (!filters.startDate || !filters.endDate) {
          console.warn("startDate 또는 endDate가 설정되지 않았습니다.");
          return;
        }

        set(
          { isLoading: true, error: null },
          false,
          "fetchTransactions:loading"
        );

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

          const res = await api<Transaction[]>(
            `/transactions?${params.toString()}`,
            {
              method: "GET",
            }
          );

          set(
            { transactions: res, isLoading: false },
            false,
            "fetchTransactions:success"
          );
        } catch (err) {
          set(
            {
              isLoading: false,
              error: err instanceof Error ? err.message : "거래 불러오기 오류",
            },
            false,
            "fetchTransactions:error"
          );
        }
      },

      fetchTransactionSummary: async ({
        groupBy,
        startDate,
        endDate,
      }: FetchTransactionSummaryParams) => {
        set(
          { isLoading: true, error: null },
          false,
          "fetchTransactionSummary:loading"
        );

        try {
          const params = new URLSearchParams();
          params.append("groupBy", groupBy);
          params.append("startDate", String(startDate));
          params.append("endDate", String(endDate));
         
      
          const res = await api<TransactionSummaryResponse>(
            `/transactions/summary?${params.toString()}`,
            { method: "GET" }
          );

          set(
            { transactionSummaryResponse: res, isLoading: false },
            false,
            "fetchTransactionSummary:success"
          );
        } catch (err) {
          set(
            {
              isLoading: false,
              error: err instanceof Error ? err.message : "요약 데이터 오류",
            },
            false,
            "fetchTransactionSummary:error"
          );
        }
      },

      fetchTransactionCalendar: async (year, month) => {
        set(
          { isLoading: true, error: null },
          false,
          "fetchTransactionCalendar:loading"
        );

        try {
          const res = await api<TransactionCalendarItem[]>(
            `/transactions/calendar?year=${year}&month=${month}`,
            { method: "GET" }
          );

          set(
            { transactionCalendarItems: res, isLoading: false },
            false,
            "fetchTransactionCalendar:success"
          );
        } catch (err) {
          set(
            {
              isLoading: false,
              error: err instanceof Error ? err.message : "캘린더 데이터 오류",
            },
            false,
            "fetchTransactionCalendar:error"
          );
        }
      },

      clear: () =>
        set(
          {
            transactions: [],
            transactionSummaryResponse: null,
            transactionCalendarItems: [],
            filters: { ...defaultFilters },
            isLoading: false,
            error: null,
          },
          false,
          "clearTransactionState"
        ),
    }),
    { name: "TransactionStore" }
  )
);
