import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  TransactionDetailDTO,
  TransactionGroupItemDTO,
  TransactionGroupSummaryDTO,
  TransactionCalendarDTO,
} from '@/modules/transaction/types';

interface TransactionFilters {
  type?: 'income' | 'expense';
  categoryId?: string;
  search?: string;
  sort?: 'date' | 'amount';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

const defaultFilters: TransactionFilters = {
  sort: 'date',
  order: 'desc',
  page: 1,
  limit: 20,
};

interface TransactionStoreState {
  transactions: TransactionDetailDTO[];
  selectedTransaction?: TransactionDetailDTO;
  transactionSummary: TransactionGroupItemDTO | null;
  transactionSummaryResponse: TransactionGroupSummaryDTO | null;
  transactionCalendarItems: TransactionCalendarDTO[];
  filters: TransactionFilters;
  isLoading: boolean;
  lastUpdatedAt: number;
  error: string | null;
}

interface TransactionStoreActions {
  setTransactions: (txs: TransactionDetailDTO[]) => void;
  setSelectedTransaction: (tx: TransactionDetailDTO) => void;
  setTransactionSummary: (data: TransactionGroupItemDTO) => void;
  setTransactionSummaryResponse: (data: TransactionGroupSummaryDTO) => void;
  setCalendarItems: (items: TransactionCalendarDTO[]) => void;
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
  devtools(
    (set) => ({
      transactions: [],
      selectedTransaction: undefined,
      transactionSummaryResponse: null,
      lastUpdatedAt: undefined,
      transactionCalendarItems: [],
      filters: { ...defaultFilters },
      isLoading: false,
      error: null,
      actions: {
        setTransactions: (txs) =>
          set(() => ({ transactions: txs }), false, 'transactions/set'),
        setSelectedTransaction: (tx) =>
          set(
            () => ({ selectedTransaction: tx }),
            false,
            'transactions/selectOne'
          ),
        setTransactionSummaryResponse: (data) =>
          set(
            () => ({
              transactionSummaryResponse: data,
              lastUpdatedAt: Date.now(),
            }),
            false,
            'summary/setTransactionSummaryResponse'
          ),
        setTransactionSummary: (data) =>
          set(
            () => ({ transactionSummary: data }),
            false,
            'summary/setTransactionSummary'
          ),
        setCalendarItems: (items) =>
          set(
            () => ({ transactionCalendarItems: items }),
            false,
            'calendar/setItems'
          ),
        setFilters: (filters) =>
          set(
            (state) => ({
              filters: { ...state.filters, ...filters },
            }),
            false,
            'filters/updatePartial'
          ),
        resetFilters: () =>
          set(
            () => ({ filters: { ...defaultFilters } }),
            false,
            'filters/reset'
          ),
        setDateRange: (start, end) =>
          set(
            (state) => ({
              filters: { ...state.filters, startDate: start, endDate: end },
            }),
            false,
            'filters/setDateRange'
          ),
        setLoading: (isLoading) =>
          set(
            () => ({ isLoading }),
            false,
            isLoading ? 'ui/loading:start' : 'ui/loading:done'
          ),
        setError: (err) => set(() => ({ error: err }), false, 'ui/setError'),
        clear: () =>
          set(
            () => ({
              transactions: [],
              selectedTransaction: undefined,
              transactionSummaryResponse: null,
              transactionSummary: null,
              lastUpdatedAt: undefined,
              transactionCalendarItems: [],
              filters: { ...defaultFilters },
              isLoading: false,
              error: null,
            }),
            false,
            'transactions/clearAll'
          ),
      },
    }),
    { name: 'useTransactionStore' }
  )
);
