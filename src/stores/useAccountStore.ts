// ✅ useAccountStore.ts (기존 구조에 따라 fetchSummary 기능 확장)

import {
  Account,
  AccountDashboardResponse,
  AccountTransactionSummaryDto,
} from '@/features/account/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TransactionSummaryResponse } from '@/features/transaction/types';
import { DateFilterParams } from '@/features/shared/types';

interface AccountStoreState {
  state: {
    accounts: Account[];
    selectedAccount?: Account;
    summaryResponse: TransactionSummaryResponse;
    accountDashboard: AccountDashboardResponse | null;
    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setAccounts: (data: Account[]) => void;
    setSelectedAccount: (acc: Account) => void;
    setSummaries: (data: AccountTransactionSummaryDto[]) => void;
    setAccountDashboard: (data: AccountDashboardResponse) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clear: () => void;
    fetchSummary: (params: DateFilterParams) => Promise<void>;
  };
}

export const useAccountStore = create<AccountStoreState>()(
  devtools(
    (set) => ({
      state: {
        accounts: [],
        selectedAccount: undefined,
        summaries: [],
        accountDashboard: null,
        isLoading: false,
        error: null,
      },
      actions: {
        setAccounts: (data) =>
          set(
            (s) => ({ state: { ...s.state, accounts: data } }),
            false,
            'accounts/setAll'
          ),

        setSelectedAccount: (acc) =>
          set(
            (s) => ({ state: { ...s.state, selectedAccount: acc } }),
            false,
            'accounts/setSelected'
          ),

        setSummaries: (data) =>
          set(
            (s) => ({ state: { ...s.state, summaries: data } }),
            false,
            'accounts/setSummaries'
          ),

        setAccountDashboard: (data) =>
          set(
            (s) => ({ state: { ...s.state, accountDashboard: data } }),
            false,
            'accounts/setDashboard'
          ),

        setLoading: (loading) =>
          set(
            (s) => ({ state: { ...s.state, isLoading: loading } }),
            false,
            'accounts/setLoading'
          ),

        setError: (error) =>
          set(
            (s) => ({ state: { ...s.state, error } }),
            false,
            'accounts/setError'
          ),

        clear: () =>
          set(
            () => ({
              state: {
                accounts: [],
                selectedAccount: undefined,
                summaryResponse: undefined,
                accountDashboard: null,
                isLoading: false,
                error: null,
              },
            }),
            false,
            'accounts/clear'
          ),

        // ✅ 신규 추가: fetchSummary
        fetchSummary: async (params) => {
          set(
            (s) => ({ state: { ...s.state, isLoading: true, error: null } }),
            false,
            'accounts/fetchSummary'
          );
          try {
            const result = await fetch(params);
            set(
              (s) => ({ state: { ...s.state, summaries: result } }),
              false,
              'accounts/setSummaryResult'
            );
          } catch (err) {
            console.error('[AccountStore] fetchSummary error:', err);
            set(
              (s) => ({
                state: { ...s.state, error: 'Failed to load summary' },
              }),
              false,
              'accounts/setSummaryError'
            );
          } finally {
            set(
              (s) => ({ state: { ...s.state, isLoading: false } }),
              false,
              'accounts/setLoadingFalse'
            );
          }
        },
      },
    }),
    { name: 'AccountStore' }
  )
);
