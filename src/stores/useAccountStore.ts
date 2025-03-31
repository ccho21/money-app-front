// 📄 src/stores/account/account.store.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  Account,
  AccountTransactionSummaryDto,
} from '@/features/account/types';

interface AccountStoreState {
  state: {
    accounts: Account[];
    selectedAccount?: Account;
    summaries: AccountTransactionSummaryDto[];
    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setAccounts: (data: Account[]) => void;
    setSelectedAccount: (acc: Account) => void;
    setSummaries: (data: AccountTransactionSummaryDto[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clear: () => void;
  };
}

export const useAccountStore = create<AccountStoreState>()(
  devtools(
    (set) => ({
      state: {
        accounts: [],
        selectedAccount: undefined,
        summaries: [],
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

        setLoading: (loading) =>
          set(
            (s) => ({ state: { ...s.state, isLoading: loading } }),
            false,
            loading ? 'ui/loading:start' : 'ui/loading:done'
          ),

        setError: (err) =>
          set(
            (s) => ({ state: { ...s.state, error: err } }),
            false,
            'ui/setError'
          ),

        clear: () =>
          set(
            () => ({
              state: {
                accounts: [],
                selectedAccount: undefined,
                summaries: [],
                isLoading: false,
                error: null,
              },
            }),
            false,
            'accounts/clearAll'
          ),
      },
    }),
    { name: 'useAccountStore' }
  )
);
