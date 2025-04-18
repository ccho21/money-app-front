'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchTransactionSummary } from '@/features/transaction/hooks';
import { DateFilterParams } from '@/features/shared/types';
import { TransactionDetailDTO } from '@/features/transaction/types';

import DailyView from '@/app/dashboard/_components/DailyView';

//
// Daily dashboard page: shows income/expense by day
//
export default function DailyPage() {
  const router = useRouter();
  const pathname = usePathname();

  const { query, setQuery, getDateRangeKey } = useFilterStore();
  const { groupBy, date } = query;

  const { isLoading, transactionSummaryResponse, actions } =
    useTransactionStore(
      useShallow((state) => ({
        isLoading: state.isLoading,
        transactionSummaryResponse: state.transactionSummaryResponse,
        actions: state.actions,
      }))
    );

  //
  // Ensure groupBy is set to 'monthly' for daily view
  //
  useEffect(() => {
    if (groupBy !== 'monthly') {
      setQuery({ groupBy: 'monthly' });
    }
  }, [groupBy, setQuery]);

  //
  // Fetch daily transaction summary for the current month groupBy
  //
  useEffect(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      groupBy: 'daily',
      startDate,
      endDate,
    };

    fetchTransactionSummary(params);
  }, [getDateRangeKey, pathname, date]);

  const totalIncome = transactionSummaryResponse?.totalIncome ?? 0;
  const totalExpense = transactionSummaryResponse?.totalExpense ?? 0;

  const summaryItems = [
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

  //
  // Handle transaction click
  //
  const handleTransactionClick = (tx: TransactionDetailDTO) => {
    actions.setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  //
  // Handle day header click to create new transaction
  //
  const handleHeaderClick = (date: string) => {
    router.push(`/transaction/new?date=${date}`);
  };

  return (
    <DailyView
      isLoading={isLoading}
      data={transactionSummaryResponse}
      summaryItems={summaryItems}
      onTransactionClick={handleTransactionClick}
      onHeaderClick={handleHeaderClick}
    />
  );
}
