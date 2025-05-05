'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useFilterStore } from '@/stores/useFilterStore';
import { useTransactionStore } from '@/modules/transaction/store';
import { fetchTransactionSummary } from '@/modules/transaction/hooks';

import type { DateFilterParams } from '@/common/types';
import type { TransactionDetailDTO } from '@/modules/transaction/types';

import { useShallow } from 'zustand/shallow';
import dynamic from 'next/dynamic';
const DailyView = dynamic(
  () => import('@/app/dashboard/components/DailyView'),
  {
    ssr: false,
  }
);

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
  }, [getDateRangeKey, date, isInitialized]);

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
      onTransactionClick={handleTransactionClick}
      onHeaderClick={handleHeaderClick}
    />
  );
}
