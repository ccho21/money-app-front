// src/app/account/[id]/detail/daily/page.tsx
'use client';

'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { useFilterStore } from '@/stores/useFilterStore';
import { useTransactionStore } from '@/modules/transaction/store';
import { useShallow } from 'zustand/shallow';

import { TransactionDetailDTO } from '@/modules/transaction/types';
import DailyView from '@/app/dashboard/components/DailyView';
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
    if (groupBy !== 'daily') {
      setQuery({ groupBy: 'daily' });
    }
  }, [groupBy, setQuery]);

  const handleTransactionClick = (tx: TransactionDetailDTO) => {
    setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  const handleHeaderClick = (date: string) => {
    router.push(`/transaction/new?date=${date}`);
  };

  const summaryItems = useMemo(() => {
    const income = summary?.totalIncome ?? 0;
    const expense = summary?.totalExpense ?? 0;
    return [
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
      {
        label: 'Total',
        value: income - expense,
        color: 'text-foreground',
        prefix: '$',
      },
    ];
  }, [summary]);

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
