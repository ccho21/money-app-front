import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  Account,
  AccountTransactionSummaryDto,
  AccountDashboardResponse,
} from '@/app/account-dashboard/_components/account/types';

interface AccountStoreState {
  state: {
    accounts: Account[];
    selectedAccount?: Account;
    summaries: AccountTransactionSummaryDto[];
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
            'accounts/setAccountDashboard'
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
                accountDashboard: null,
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
