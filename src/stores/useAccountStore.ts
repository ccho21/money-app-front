import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AccountSummary } from '@/features/accounts/types';

interface AccountState {
  summaries: AccountSummary[];
  isLoading: boolean;
  error: string | null;

  fetchAccountSummaries: () => Promise<void>;
  clear: () => void;
}

export const useAccountStore = create<AccountState>()(
  devtools(
    (set) => ({
      summaries: [],
      isLoading: false,
      error: null,

      fetchAccountSummaries: async () => {
        set(
          { isLoading: true, error: null },
          false,
          'fetchAccountSummaries:loading'
        );

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/accounts/summary`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );

          if (!res.ok) throw new Error('계좌 요약 불러오기 실패');

          const data = await res.json();
          set(
            { summaries: data, isLoading: false },
            false,
            'fetchAccountSummaries:success'
          );
        } catch (err) {
          set(
            {
              isLoading: false,
              error: err instanceof Error ? err.message : '계좌 요약 오류',
            },
            false,
            'fetchAccountSummaries:error'
          );
        }
      },

      clear: () =>
        set(
          { summaries: [], isLoading: false, error: null },
          false,
          'clearAccountSummaries'
        ),
    }),
    { name: 'AccountSummaryStore' }
  )
);
