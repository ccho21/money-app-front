'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { useFilterStore } from '@/stores/useFilterStore';
import { useTransactionStore } from '@/modules/transaction/store';

import { useShallow } from 'zustand/shallow';
import { TransactionDetailDTO } from '@/modules/transaction/types';
import DailyView from '@/app/dashboard/_components/DailyView';
import { useAccountDetailSummary } from '@/modules/account/hooks';

export default function AccountDailyPage() {
  const router = useRouter();
  const { id: accountId } = useParams();

  const { query, setQuery } = useFilterStore(
    useShallow((s) => ({
      query: s.query,
      setQuery: s.setQuery,
    }))
  );

  const { groupBy } = query;
  const { summary, isLoading } = useAccountDetailSummary(
    accountId as string,
    'daily'
  );

  const { setSelectedTransaction } = useTransactionStore(
    useShallow((s) => ({
      setSelectedTransaction: s.setSelectedTransaction,
    }))
  );

  useEffect(() => {
    if (groupBy !== 'monthly') {
      setQuery({ groupBy: 'monthly' });
    }
  }, [groupBy, setQuery]);

  const handleTransactionClick = (tx: TransactionDetailDTO) => {
    setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  const handleHeaderClick = (date: string) => {
    router.push(`/transaction/new?date=${date}`);
  };

  const items = [
    {
      label: 'Income',
      value: summary?.totalIncome ?? 0,
      color: (summary?.totalIncome ?? 0) > 0 ? 'text-info' : 'text-muted',
      prefix: '$',
    },
    {
      label: 'Exp.',
      value: summary?.totalExpense ?? 0,
      color: (summary?.totalExpense ?? 0) > 0 ? 'text-error' : 'text-muted',
      prefix: '$',
    },
    {
      label: 'Total',
      value: (summary?.totalIncome ?? 0) - (summary?.totalExpense ?? 0),
      color: 'text-foreground',
      prefix: '$',
    },
  ];

  return (
    <DailyView
      isLoading={isLoading}
      data={summary}
      summaryItems={items}
      onTransactionClick={handleTransactionClick}
      onHeaderClick={handleHeaderClick}
    />
  );
}
