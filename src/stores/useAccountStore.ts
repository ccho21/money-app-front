import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  Account,
  AccountTransactionSummaryDto,
} from '@/features/account/types';

interface AccountState {
  accounts: Account[];
  summaries: AccountTransactionSummaryDto[];
  isLoading: boolean;
  error: string | null;

  setAccounts: (data: Account[]) => void;
  setSummaries: (data: AccountTransactionSummaryDto[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

export const useAccountStore = create<AccountState>()(
  devtools(
    (set) => ({
      accounts: [],
      summaries: [],
      isLoading: false,
      error: null,

      setAccounts: (data) => set({ accounts: data }),
      setSummaries: (data) => set({ summaries: data }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (err) => set({ error: err }),

      clear: () =>
        set({
          accounts: [],
          summaries: [],
          isLoading: false,
          error: null,
        }),
    }),
    { name: 'AccountStore' }
  )
);
