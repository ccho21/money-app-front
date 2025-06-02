'use client';

import { useLayoutEffect, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import { Skeleton } from '@/components/ui/skeleton';
import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';
import { useAccountById } from '@/modules/account/hooks/queries';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { useTransactionGroupsQuery } from '@/modules/transaction/hooks/queries';
import type {
  TransactionItem,
  TransactionGroupQuery,
} from '@/modules/transaction/types/types';
import AccountSummaryBox from '@/modules/account/components/AccountSummaryBox';
import DateNavigator from '@/components/navigation/DateNavigator';

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
    title: account?.name ? account.name : 'Account',
    onBack: () => router.back(),
  });

  const { query, setQuery, getDateRangeKey, initializeListDefaults } =
    useTransactionFilterStore();
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
    data: groups,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useTransactionGroupsQuery(queryParams);

  const isLoading = isGroupsLoading;

  const handleTransactionClick = (tx: TransactionItem) => {
    router.push(`/transaction/manage/${tx.id}/edit`);
  };

  const handleHeaderClick = (date: string) => {
    router.push(`/transaction/manage/new?date=${date}&accountId=${accountId}`);
  };

  if (isGroupsError) {
    return (
      <div className='text-label text-destructive'>
        Failed to load transactions.
      </div>
    );
  }

  if (isLoading) return <Skeleton className='h-40 w-full' />;
  if (!account || !groups) return null;

  return (
    <div className='space-y-component'>
      <section className='text-foreground'>
        <div className='flex justify-between items-baseline'>
          <div>
            <h2 className='text-heading font-semibold'>Account Overview</h2>
          </div>
          <DateNavigator variant='dropdown' />
        </div>
        <p className='text-subheading text-muted-foreground mb-component'>
          Balance, settings, and payment schedule for this account.
        </p>
        <AccountSummaryBox account={account} />
      </section>

      <section>
        {/* <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-heading font-semibold'>Daily Transactions</h2>
          </div>
        </div> */}

        <TransactionListView
          isLoading={isLoading}
          data={groups}
          onItemClick={handleTransactionClick}
          onGroupClick={handleHeaderClick}
        />
      </section>
    </div>
  );
}
