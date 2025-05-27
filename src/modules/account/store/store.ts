import {
  AccountDashboardDTO,
  AccountTransactionSummaryDTO,
} from './types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AccountStoreState {
  summary: AccountTransactionSummaryDTO | null;
  accountDashboard: AccountDashboardDTO | null;

  setSummary: (data: AccountTransactionSummaryDTO) => void;
  setAccountDashboard: (data: AccountDashboardDTO) => void;
  clear: () => void;
}

export const useAccountStore = create<AccountStoreState>()(
  devtools((set) => ({
    summary: null,
    accountDashboard: null,

    setSummary: (data) => set({ summary: data }),
    setAccountDashboard: (data) => set({ accountDashboard: data }),
    clear: () => set({ summary: null, accountDashboard: null }),
  }))
);
