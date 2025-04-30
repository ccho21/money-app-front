'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useFilterStore } from '@/stores/useFilterStore';
import { useTransactionStore } from '@/modules/transaction/store';
import { fetchTransactionSummary } from '@/modules/transaction/hooks';

import type { DateFilterParams } from '@/common/types';
import type { TransactionDetailDTO } from '@/modules/transaction/types';

import DailyView from '@/app/dashboard/_components/DailyView';
import { useShallow } from 'zustand/shallow';

export default function DailyPage() {
  const router = useRouter();

  const { query, setQuery, getDateRangeKey, isInitialized } = useFilterStore();
  const { groupBy, date } = query;

  const { summary, isLoading, setSelectedTransaction } = useTransactionStore(
    useShallow((s) => ({
      summary: s.summary,
      isLoading: s.isLoading,
      setSelectedTransaction: s.setSelectedTransaction,
    }))
  );

  useEffect(() => {
    if (groupBy !== 'monthly') {
      setQuery({ groupBy: 'monthly' });
    }
  }, [groupBy, setQuery]);

  useEffect(() => {
    if (!isInitialized) return;

    const [startDate, endDate] = getDateRangeKey().split('_');

    const params: DateFilterParams = {
      groupBy: 'daily',
      startDate,
      endDate,
    };

    fetchTransactionSummary(params);
  }, [getDateRangeKey, date]);

  const totalIncome = summary?.totalIncome ?? 0;
  const totalExpense = summary?.totalExpense ?? 0;

  const summaryItems = useMemo(
    () => [
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
    ],
    [totalIncome, totalExpense]
  );

  const handleTransactionClick = (tx: TransactionDetailDTO) => {
    setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  const handleHeaderClick = (date: string) => {
    router.push(`/transaction/new?date=${date}`);
  };

  return (
    <DailyView
      isLoading={isLoading}
      data={summary}
      summaryItems={summaryItems}
      onTransactionClick={handleTransactionClick}
      onHeaderClick={handleHeaderClick}
    />
  );
}
