import {
  Budget,
  BudgetAlert,
  CreateBudgetDto,
  UpdateBudgetDto,
} from '@/features/budget/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BudgetState {
  budget: Budget | null;
  alerts: BudgetAlert[];

  isLoading: boolean;
  error: string | null;

  fetchBudget: () => Promise<void>;
  createBudget: (dto: CreateBudgetDto) => Promise<void>;
  updateBudget: (dto: UpdateBudgetDto) => Promise<void>;
  fetchAlerts: () => Promise<void>;

  clear: () => void;
}

export const useBudgetStore = create<BudgetState>()(
  devtools(
    (set) => ({
      budget: null,
      alerts: [],
      isLoading: false,
      error: null,

      fetchBudget: async () => {
        set({ isLoading: true, error: null }, false, 'fetchBudget:loading');

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/budgets/me`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );

          if (!res.ok) throw new Error('예산 불러오기 실패');

          const data = await res.json();
          set({ budget: data, isLoading: false }, false, 'fetchBudget:success');
        } catch (err) {
          set(
            {
              budget: null,
              isLoading: false,
              error: err instanceof Error ? err.message : '예산 불러오기 오류',
            },
            false,
            'fetchBudget:error'
          );
        }
      },

      createBudget: async (dto) => {
        set({ isLoading: true, error: null }, false, 'createBudget:loading');

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/budgets`,
            {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dto),
            }
          );

          if (!res.ok) throw new Error('예산 생성 실패');

          const data = await res.json();
          set(
            { budget: data, isLoading: false },
            false,
            'createBudget:success'
          );
        } catch (err) {
          set(
            {
              isLoading: false,
              error: err instanceof Error ? err.message : '예산 생성 오류',
            },
            false,
            'createBudget:error'
          );
        }
      },

      updateBudget: async (dto) => {
        set({ isLoading: true, error: null }, false, 'updateBudget:loading');

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/budgets`,
            {
              method: 'PATCH',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dto),
            }
          );

          if (!res.ok) throw new Error('예산 수정 실패');

          const data = await res.json();
          set(
            { budget: data, isLoading: false },
            false,
            'updateBudget:success'
          );
        } catch (err) {
          set(
            {
              isLoading: false,
              error: err instanceof Error ? err.message : '예산 수정 오류',
            },
            false,
            'updateBudget:error'
          );
        }
      },

      fetchAlerts: async () => {
        set({ isLoading: true, error: null }, false, 'fetchAlerts:loading');

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/budgets/alerts`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );

          if (!res.ok) throw new Error('예산 경고 불러오기 실패');

          const data = await res.json();
          set({ alerts: data, isLoading: false }, false, 'fetchAlerts:success');
        } catch (err) {
          set(
            {
              alerts: [],
              isLoading: false,
              error: err instanceof Error ? err.message : '경고 데이터 오류',
            },
            false,
            'fetchAlerts:error'
          );
        }
      },

      clear: () =>
        set(
          {
            budget: null,
            alerts: [],
            isLoading: false,
            error: null,
          },
          false,
          'clearBudgetStore'
        ),
    }),
    { name: 'BudgetStore' }
  )
);
