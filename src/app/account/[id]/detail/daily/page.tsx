'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchTransactionSummary } from '@/features/transaction/hooks';

import { useShallow } from 'zustand/shallow';
import { DateFilterParams } from '@/features/shared/types';
import { Transaction } from '@/features/transaction/types';
import DailyView from '@/app/dashboard/_components/DailyView';

export default function AccountDailyPage() {
  const router = useRouter();

  const { query, setQuery, getDateRangeKey } = useFilterStore(
    useShallow((s) => ({
      query: s.query,
      setQuery: s.setQuery,
      getDateRangeKey: s.getDateRangeKey,
    }))
  );
  const { date, range } = query;

  const { isLoading, transactionSummaryResponse, actions } =
    useTransactionStore(
      useShallow((state) => ({
        isLoading: state.isLoading,
        transactionSummaryResponse: state.transactionSummaryResponse,
        actions: state.actions,
      }))
    );

  useEffect(() => {
    const updateAndFetch = async () => {
      if (range !== 'monthly') {
        setQuery({ range: 'monthly' });
        return; // range가 업데이트되면 이후 useEffect에서 다시 fetch
      }

      const [startDate, endDate] = getDateRangeKey().split('_');
      const params: DateFilterParams = {
        groupBy: 'daily',
        startDate,
        endDate,
      };
      await fetchTransactionSummary(params);
    };

    updateAndFetch();
  }, [date, range, setQuery, getDateRangeKey]);

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
