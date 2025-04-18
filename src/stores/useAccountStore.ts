import {
  AccountDashboardResponseDTO,
  AccountDTO,
  AccountTransactionSummaryDTO,
} from '@/features/account/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AccountStoreState {
  state: {
    accounts: AccountDTO[];
    selectedAccount?: AccountDTO;
    summaryResponse: AccountTransactionSummaryDTO[];
    accountDashboard: AccountDashboardResponseDTO | null;
    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setAccounts: (data: AccountDTO[]) => void;
    setSelectedAccount: (acc: AccountDTO) => void;
    setSummaryResponse: (data: AccountTransactionSummaryDTO[]) => void;
    setAccountDashboard: (data: AccountDashboardResponseDTO) => void;
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
        summaryResponse: [],
        accountDashboard: null,
        isLoading: false,
        error: null,
      },
      //
      // Set the entire accounts list
      //
      setAccounts: (data: AccountDTO[]) =>
        set(
          (s) => ({ state: { ...s.state, accounts: data } }),
          false,
          'accounts/setAll'
        ),
      //
      // Set the selected account
      //
      setSelectedAccount: (acc: AccountDTO) =>
        set(
          (s) => ({ state: { ...s.state, selectedAccount: acc } }),
          false,
          'accounts/setSelected'
        ),
      //
      // Set the transaction summary per account
      //
      setSummaryResponse: (data: AccountTransactionSummaryDTO[]) =>
        set(
          (s) => ({ state: { ...s.state, summaryResponse: data } }),
          false,
          'accounts/setSummaryResponse'
        ),
      //
      // Set dashboard view data
      //
      setAccountDashboard: (data: AccountDashboardResponseDTO) =>
        set(
          (s) => ({ state: { ...s.state, accountDashboard: data } }),
          false,
          'accounts/setDashboard'
        ),
      //
      // Set loading status
      //
      setLoading: (loading: boolean) =>
        set(
          (s) => ({ state: { ...s.state, isLoading: loading } }),
          false,
          'accounts/setLoading'
        ),
      //
      // Set error message
      //
      setError: (error: string | null) =>
        set(
          (s) => ({ state: { ...s.state, error } }),
          false,
          'accounts/setError'
        ),
      //
      // Reset the entire store to initial state
      //
      clear: () =>
        set(
          () => ({
            state: {
              accounts: [],
              selectedAccount: undefined,
              summaryResponse: [],
              accountDashboard: null,
              isLoading: false,
              error: null,
            },
          }),
          false,
          'accounts/clear'
        ),
    }),
    { name: 'AccountStore' }
  )
);
