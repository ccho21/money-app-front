'use client';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { fetchTransactionSummary } from '@/services/transactionService';
import { getDateRangeKey } from '@/lib/date.util';
import { DateFilterParams } from '@/features/shared/types';
import { Transaction } from '@/features/transaction/types';
import DailyView from '@/components/common/DailyView';
import { useShallow } from 'zustand/shallow';
import { useFilterStore } from '@/stores/useFilterStore';

export default function DailyPage() {
  const router = useRouter();
  const pathname = usePathname();

  const { query, setQuery } = useFilterStore();
  const { date, range } = query;

  const { isLoading, transactionSummaryResponse, actions } =
    useTransactionStore(
      useShallow((state) => ({
        isLoading: state.isLoading,
        transactionSummaryResponse: state.transactionSummaryResponse,
        actions: state.actions,
      }))
    );

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: 'monthly', amount: 0 }),
    [date]
  );

  useEffect(() => {
    if (range !== 'monthly') {
      setQuery({ range: 'monthly' });
    }
  }, [range, setQuery]);

  useEffect(() => {
    const [startDate, endDate] = dateRangeKey.split('_');
    const params: DateFilterParams = {
      groupBy: 'daily',
      startDate,
      endDate,
    };
    const run = async () => {
      await fetchTransactionSummary(params);
    };
    run();
  }, [dateRangeKey, pathname]);

  const totalIncome = transactionSummaryResponse?.incomeTotal ?? 0;
  const totalExpense = transactionSummaryResponse?.expenseTotal ?? 0;

  const items = [
    {
      label: 'Income',
      value: totalIncome,
      prefix: '$',
      color: 'text-info',
    },
    {
      label: 'Exp.',
      value: totalExpense,
      prefix: '$',
      color: 'text-error',
    },
    {
      label: 'Total',
      value: totalIncome - totalExpense,
      prefix: '$',
      color: 'text-success',
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
