'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchTransactionSummary } from '@/features/transaction/hooks';

import { useShallow } from 'zustand/shallow';
import { DateFilterParams } from '@/features/shared/types';
import { TransactionDetailDTO } from '@/features/transaction/types';
import DailyView from '@/app/dashboard/_components/DailyView';

//
// Daily account transaction detail page
//
export default function AccountDailyPage() {
  const router = useRouter();

  const { query, setQuery, getDateRangeKey } = useFilterStore(
    useShallow((s) => ({
      query: s.query,
      setQuery: s.setQuery,
      getDateRangeKey: s.getDateRangeKey,
    }))
  );

  const { date, groupBy } = query;

  const { isLoading, transactionSummaryResponse, actions } =
    useTransactionStore(
      useShallow((state) => ({
        isLoading: state.isLoading,
        transactionSummaryResponse: state.transactionSummaryResponse,
        actions: state.actions,
      }))
    );

  //
  // Fetch daily grouped transaction summary
  //
  useEffect(() => {
    const updateAndFetch = async () => {
      if (groupBy !== 'monthly') {
        setQuery({ groupBy: 'monthly' });
        return;
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
  }, [date, groupBy, setQuery, getDateRangeKey]);

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

  //
  // Handle transaction item click
  //
  const handleTransactionClick = (tx: TransactionDetailDTO) => {
    actions.setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  //
  // Handle header (date) click
  //
  const handleHeaderClick = (date: string) => {
    router.push(`/transaction/new?date=${date}`);
  };

  return (
    <DailyView
      isLoading={isLoading}
      data={transactionSummaryResponse}
      summaryItems={items}
      onTransactionClick={handleTransactionClick}
      onHeaderClick={handleHeaderClick}
    />
  );
}
