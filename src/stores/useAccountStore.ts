import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { api } from '@/features/shared/api';
import {
  Account,
  AccountTransactionSummaryDto,
  AccountTransactionSummaryParams,
} from '@/features/accounts/types';

interface AccountState {
  accounts: Account[];
  summaries: AccountTransactionSummaryDto[];
  isLoading: boolean;
  error: string | null;
  fetchAccounts: () => void;
  fetchAccountTransactionSummary: ({
    startDate,
    endDate,
  }: AccountTransactionSummaryParams) => Promise<void>;
  clear: () => void;
}

export const useAccountStore = create<AccountState>()(
  devtools(
    (set) => ({
      summaries: [],
      isLoading: false,
      error: null,
      fetchAccounts: async () => {
        try {
          set({ isLoading: true, error: null });
          const res = await api<Account[]>('/accounts');
          set({ accounts: res });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : '계좌 불러오기 실패',
          });
        } finally {
          set({ isLoading: false });
        }
      },
      fetchAccountTransactionSummary: async ({
        startDate,
        endDate,
      }: AccountTransactionSummaryParams) => {
        set(
          { isLoading: true, error: null },
          false,
          'fetchAccountTransactionSummary:loading'
        );

        try {
          const params = new URLSearchParams();
          params.append('startDate', String(startDate));
          params.append('endDate', String(endDate));
          const res = await api<AccountTransactionSummaryDto[]>(
            `/accounts/grouped-transactions?${params.toString()}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );

          set(
            { summaries: res, isLoading: false },
            false,
            'fetchAccountTransactionSummary:success'
          );
        } catch (err) {
          set(
            {
              isLoading: false,
              error: err instanceof Error ? err.message : '계좌 요약 오류',
            },
            false,
            'fetchAccountTransactionSummary:error'
          );
        }
      },

      clear: () =>
        set(
          {
            summaries: [],
            isLoading: false,
            error: null,
          },
          false,
          'clearAccountSummaries'
        ),
    }),
    { name: 'AccountStore' }
  )
);
