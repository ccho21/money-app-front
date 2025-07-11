'use client';

import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import SummaryBox from '@/modules/transaction/components/SummaryBox';
import {
  TransactionItem,
  TransactionGroupQuery,
} from '@/modules/transaction/types/types';
import {
  useTransactionGroupsQuery,
  useTransactionSummaryQuery,
} from '@/modules/transaction/hooks/queries';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const TransactionListView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionListView'),
  { ssr: false }
);

export default function ListPage() {
  const router = useRouter();

  const { query, getDateRangeKey, getQueryString, initializeListDefaults } =
    useTransactionFilterStore();
  const { timeframe, groupBy } = query;

  useLayoutEffect(() => {
    initializeListDefaults();
  }, [initializeListDefaults]);

  const [startDate, endDate] = getDateRangeKey().split('_');

  const queryParams: TransactionGroupQuery = {
    ...query,
    timeframe,
    startDate,
    endDate,
    groupBy,
  };

  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useTransactionSummaryQuery(queryParams);

  const {
    data: groupList,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useTransactionGroupsQuery(queryParams);

  const isLoading = isSummaryLoading || isGroupsLoading;

  const handleTransactionClick = (tx: TransactionItem) => {
    router.push(`/transaction/manage/${tx.id}/edit`);
  };

  const handleHeaderClick = (date: string) => {
    router.push(`/transaction/manage/new?date=${date}`);
  };

  if (isSummaryError || isGroupsError) {
    return (
      <div className='text-label text-destructive'>
        Failed to load transactions.
      </div>
    );
  }

  if (isLoading) return <Skeleton className='h-40 w-full' />;
  if (!summary || !groupList) return null;

  return (
    <section className='space-y-component bg-background text-foreground'>
      <SummaryBox
        summary={summary}
        timeframe={timeframe}
        onNavigate={() => router.replace(getQueryString())}
      />
      <Separator className='my-compact' />

      <div className='flex justify-between items-center'></div>

      <div className='space-y-tight'>
        {/* <h3 className='text-heading font-bold'>All Transactions</h3> */}
        <TransactionListView
          isLoading={isLoading}
          data={groupList}
          onItemClick={handleTransactionClick}
          onGroupClick={handleHeaderClick}
        />
      </div>
    </section>
  );
}
