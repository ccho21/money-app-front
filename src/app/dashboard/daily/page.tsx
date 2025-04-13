'use client';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { fetchTransactionSummary } from '@/features/transaction/hooks';
import { DateFilterParams } from '@/features/shared/types';
import { Transaction } from '@/features/transaction/types';
import DailyView from '@/app/dashboard/_components/DailyView';
import { useShallow } from 'zustand/shallow';
import { useFilterStore } from '@/stores/useFilterStore';

export default function DailyPage() {
  const router = useRouter();
  const pathname = usePathname();

  const { query, setQuery, getDateRangeKey } = useFilterStore();
  const { range, date } = query;

  const { isLoading, transactionSummaryResponse, actions } =
    useTransactionStore(
      useShallow((state) => ({
        isLoading: state.isLoading,
        transactionSummaryResponse: state.transactionSummaryResponse,
        actions: state.actions,
      }))
    );

  useEffect(() => {
    if (range !== 'monthly') {
      setQuery({ range: 'monthly' });
    }
  }, [range, setQuery]);

  useEffect(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      groupBy: 'daily',
      startDate,
      endDate,
    };
    (async () => {
      await fetchTransactionSummary(params);
    })();
  }, [getDateRangeKey, pathname, date]);

  const totalIncome = transactionSummaryResponse?.incomeTotal ?? 0;
  const totalExpense = transactionSummaryResponse?.expenseTotal ?? 0;

  const items = [
    {
      label: 'Income',
      value: totalIncome,
      color: totalIncome > 0 ? 'text-info' : 'text-muted',
      prefix: '$',
    },
    {
      label: 'Exp.',
      value: totalExpense,
      color: totalExpense > 0 ? 'text-error' : 'text-muted',
      prefix: '$',
    },
    {
      label: 'Total',
      value: totalIncome - totalExpense,
      color: 'text-foreground',
      prefix: '$',
    },
  ];

  return (
    <DailyView
      isLoading={isLoading}
      data={transactionSummaryResponse}
      summaryItems={items}
      onTransactionClick={(tx: Transaction) => {
        actions.setSelectedTransaction(tx);
        router.push(`/transaction/${tx.id}/edit`);
      }}
      onHeaderClick={(date: string) => {
        router.push(`/transaction/new?date=${date}`);
      }}
    />
  );
}
