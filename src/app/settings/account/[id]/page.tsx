'use client';

import { useLayoutEffect, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import SummaryBox from '@/modules/transaction/components/SummaryBox';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';
import { useAccountById } from '@/modules/account/hooks/queries';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import {
  useTransactionGroupsQuery,
  useTransactionSummaryQuery,
} from '@/modules/transaction/hooks/queries';
import type {
  TransactionItem,
  TransactionGroupQuery,
} from '@/modules/transaction/types/types';

const TransactionListView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionListView'),
  { ssr: false }
);

export default function AccountDailyPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const accountId = String(id);

  const { data: account } = useAccountById(accountId, !!accountId);

  useTopNavPreset({
    title: account?.name ?? 'Account',
    onBack: () => router.back(),
  });

  const {
    query,
    setQuery,
    getDateRangeKey,
    getQueryString,
    initializeListDefaults,
  } = useTransactionFilterStore();
  const { timeframe, groupBy } = query;

  useLayoutEffect(() => {
    initializeListDefaults();
  }, [initializeListDefaults]);

  useEffect(() => {
    if (groupBy !== 'date') {
      setQuery(() => ({ groupBy: 'date' }));
    }
  }, [groupBy, setQuery]);

  const [startDate, endDate] = getDateRangeKey().split('_');
  const queryParams: TransactionGroupQuery = {
    ...query,
    accountId,
    timeframe,
    groupBy: 'date',
    startDate,
    endDate,
  };

  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useTransactionSummaryQuery(queryParams);

  const {
    data: groups,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useTransactionGroupsQuery(queryParams);

  const isLoading = isSummaryLoading || isGroupsLoading;

  const handleTransactionClick = (tx: TransactionItem) => {
    router.push(`/transaction/manage/${tx.id}/edit`);
  };

  const handleHeaderClick = (date: string) => {
    router.push(`/transaction/manage/new?date=${date}&accountId=${accountId}`);
  };

  if (isSummaryError || isGroupsError) {
    return (
      <div className='text-label text-destructive'>
        Failed to load transactions.
      </div>
    );
  }

  if (isLoading) return <Skeleton className='h-40 w-full' />;
  if (!summary || !groups) return null;

  return (
    <section className='space-y-component bg-background text-foreground'>
      <SummaryBox
        summary={summary}
        onNavigate={() => router.replace(getQueryString())}
      />
      <Separator className='my-compact' />
      <TransactionListView
        isLoading={isLoading}
        data={groups}
        onItemClick={handleTransactionClick}
        onGroupClick={handleHeaderClick}
      />
    </section>
  );
}
