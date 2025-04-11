import {
  Account,
  AccountDashboardResponse,
  AccountSummaryDTO,
} from '@/features/account/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AccountStoreState {
  state: {
    accounts: Account[];
    selectedAccount?: Account;
    summaryResponse: AccountSummaryDTO[]; // ✅ 타입 수정: 단일 객체 ❌ → 배열 ✅
    accountDashboard: AccountDashboardResponse | null;
    isLoading: boolean;
    error: string | null;
  };
  actions: {
    setAccounts: (data: Account[]) => void;
    setSelectedAccount: (acc: Account) => void;
    setSummaryResponse: (data: AccountSummaryDTO[]) => void;
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
        summaryResponse: [], // ✅ 초기값도 배열로 통일
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

        setSummaryResponse: (data) =>
          set(
            (s) => ({ state: { ...s.state, summaryResponse: data } }),
            false,
            'accounts/setSummaryResponse'
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
                summaryResponse: [], // ✅ clear할 때도 배열로 초기화
                accountDashboard: null,
                isLoading: false,
                error: null,
              },
            }),
            false,
            'accounts/clear'
          ),
      },
    }),
    { name: 'AccountStore' }
  )
);
