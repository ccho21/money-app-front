// 파일: src/modules/account/store.ts

import {
  AccountDashboardDTO,
  AccountDetailDTO,
  AccountTransactionSummaryDTO,
} from './types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AccountStoreState {
  accounts: AccountDetailDTO[];
  selectedAccount: AccountDetailDTO | null;
  summary: AccountTransactionSummaryDTO[]; // ✅ 배열로 수정
  accountDashboard: AccountDashboardDTO | null;

  isLoading: boolean;
  error: string | null;

  setAccounts: (data: AccountDetailDTO[]) => void;
  setSelectedAccount: (acc: AccountDetailDTO) => void;
  setSummary: (data: AccountTransactionSummaryDTO[]) => void;
  setAccountDashboard: (data: AccountDashboardDTO) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

export const useAccountStore = create<AccountStoreState>()(
  devtools((set) => ({
    accounts: [],
    selectedAccount: null,
    accountDashboard: null,
    summary: [],
    isLoading: false,
    error: null,

    setAccounts: (data) => set({ accounts: data }),
    setSelectedAccount: (acc) => set({ selectedAccount: acc }),
    setAccountDashboard: (data) => set({ accountDashboard: data }),
    setSummary: (data) => set({ summary: data }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clear: () =>
      set({
        accounts: [],
        selectedAccount: null,
        summary: [],
        isLoading: false,
        error: null,
      }),
  }))
);
