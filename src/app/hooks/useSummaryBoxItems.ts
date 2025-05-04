// src/hooks/useSummaryBoxItems.ts

import { useMemo } from 'react';
import { useTransactionStore } from '@/modules/transaction/store';
import { useBudgetStore } from '@/modules/budget/store';
import { useAccountStore } from '@/modules/account/store';
import { useShallow } from 'zustand/shallow';

export function useSummaryBoxItems(currentTab: string) {
  // ✅ store 상태 shallow하게 가져오기
  const { summary: transactionSummary } = useTransactionStore(
    useShallow((s) => ({ summary: s.summary }))
  );

  const { summary: budgetSummary } = useBudgetStore(
    useShallow((s) => ({ summary: s.summary }))
  );

  const { summary: accountSummary } = useAccountStore(
    useShallow((s) => ({ summary: s.summary }))
  );

  // ✅ 메모이제이션된 summary items 리턴
  return useMemo(() => {
    switch (currentTab) {
      case 'daily': {
        const income = transactionSummary?.totalIncome ?? 0;
        const expense = transactionSummary?.totalExpense ?? 0;
        return [
          {
            label: 'Total',
            value: income - expense,
            color: 'text-foreground',
            prefix: '$',
          },
          {
            label: 'Income',
            value: income,
            color: income > 0 ? 'text-info' : 'text-muted',
            prefix: '$',
          },
          {
            label: 'Exp.',
            value: expense,
            color: expense > 0 ? 'text-error' : 'text-muted',
            prefix: '$',
          },
        ];
      }

      case 'calendar': {
        const income = transactionSummary?.totalIncome ?? 0;
        const expense = transactionSummary?.totalExpense ?? 0;
        return [
          {
            label: 'Income',
            value: income,
            color: 'text-success',
            prefix: '$',
          },
          {
            label: 'Exp.',
            value: expense,
            color: 'text-error',
            prefix: '$',
          },
          {
            label: 'Total',
            value: income - expense,
            color: 'text-foreground',
            prefix: '$',
          },
        ];
      }

      case 'monthly': {
        const spent = budgetSummary?.totalSpent ?? 0;
        const budget = budgetSummary?.totalBudget ?? 0;
        return [
          {
            label: 'Budget',
            value: budget,
            prefix: '$',
          },
          {
            label: 'Spent',
            value: spent,
            prefix: '$',
          },
          {
            label: 'Remaining',
            value: budget - spent,
            prefix: '$',
          },
        ];
      }

      case 'summary': {
        const income =
          accountSummary?.items?.reduce(
            (sum, item) => sum + item.totalIncome,
            0
          ) ?? 0;
        const expense =
          accountSummary?.items?.reduce(
            (sum, item) => sum + item.totalExpense,
            0
          ) ?? 0;

        return [
          {
            label: 'All Income',
            value: income,
            prefix: '$',
          },
          {
            label: 'All Expense',
            value: expense,
            prefix: '$',
          },
          {
            label: 'Net',
            value: income - expense,
            prefix: '$',
          },
        ];
      }

      default:
        return [];
    }
  }, [currentTab, transactionSummary, budgetSummary, accountSummary]);
}
