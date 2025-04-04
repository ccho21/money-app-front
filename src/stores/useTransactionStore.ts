import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  Transaction,
  TransactionSummary,
  TransactionSummaryResponse,
  TransactionCalendarItem,
} from "@/features/transaction/types";

interface TransactionFilters {
  type?: "income" | "expense";
  categoryId?: string;
  search?: string;
  sort?: "date" | "amount";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

const defaultFilters: TransactionFilters = {
  sort: "date",
  order: "desc",
  page: 1,
  limit: 20,
};

interface TransactionStoreState {
  transactions: Transaction[];
  selectedTransaction?: Transaction;
  transactionSummary: TransactionSummary | null;
  transactionSummaryResponse: TransactionSummaryResponse | null;
  transactionCalendarItems: TransactionCalendarItem[];
  filters: TransactionFilters;
  isLoading: boolean;
  error: string | null;
}

interface TransactionStoreActions {
  setTransactions: (txs: Transaction[]) => void;
  setSelectedTransaction: (tx: Transaction) => void;
  setTransactionSummary: (data: TransactionSummary) => void;
  setTransactionSummaryResponse: (data: TransactionSummaryResponse) => void;
  setCalendarItems: (items: TransactionCalendarItem[]) => void;
  setFilters: (filters: Partial<TransactionFilters>) => void;
  resetFilters: () => void;
  setDateRange: (start: string, end: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (err: string | null) => void;
  clear: () => void;
}

export const useTransactionStore = create<
  TransactionStoreState & { actions: TransactionStoreActions }
>()(
  devtools((set) => ({
    transactions: [],
    selectedTransaction: undefined,
    transactionSummaryResponse: null,
    transactionCalendarItems: [],
    filters: { ...defaultFilters },
    isLoading: false,
    error: null,
    actions: {
      setTransactions: (txs) =>
        set((state) => ({ transactions: txs }), false, "transactions/set"),
      setSelectedTransaction: (tx) =>
        set(
          (state) => ({ selectedTransaction: tx }),
          false,
          "transactions/selectOne"
        ),
      setTransactionSummaryResponse: (data) =>
        set(
          (state) => ({ transactionSummaryResponse: data }),
          false,
          "summary/setTransactionSummaryResponse"
        ),
      setTransactionSummary: (data) =>
        set(
          (state) => ({ transactionSummary: data }),
          false,
          "summary/setTransactionSummary"
        ),
      setCalendarItems: (items) =>
        set(
          (state) => ({ transactionCalendarItems: items }),
          false,
          "calendar/setItems"
        ),
      setFilters: (filters) =>
        set(
          (state) => ({
            filters: { ...state.filters, ...filters },
          }),
          false,
          "filters/updatePartial"
        ),
      resetFilters: () =>
        set(() => ({ filters: { ...defaultFilters } }), false, "filters/reset"),
      setDateRange: (start, end) =>
        set(
          (state) => ({
            filters: { ...state.filters, startDate: start, endDate: end },
          }),
          false,
          "filters/setDateRange"
        ),
      setLoading: (isLoading) =>
        set(
          () => ({ isLoading }),
          false,
          isLoading ? "ui/loading:start" : "ui/loading:done"
        ),
      setError: (err) => set(() => ({ error: err }), false, "ui/setError"),
      clear: () =>
        set(
          () => ({
            transactions: [],
            selectedTransaction: undefined,
            transactionSummaryResponse: null,
            transactionSummary: null,
            transactionCalendarItems: [],
            filters: { ...defaultFilters },
            isLoading: false,
            error: null,
          }),
          false,
          "transactions/clearAll"
        ),
    },
  }))
);
