'use client';

import { useLayoutEffect, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import { Skeleton } from '@/components/ui/skeleton';
import { useTopNavPreset } from '@/modules/shared/hooks/topNavPreset';
import { useAccountById } from '@/modules/account/hooks/queries';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { useTransactionGroupsQuery } from '@/modules/transaction/hooks/queries';
import type {
  TransactionItem,
  TransactionGroupQuery,
} from '@/modules/transaction/types/types';
import AccountSummaryBox from '@/modules/account/components/AccountSummaryBox';
import DateNavigator from '@/components/navigation/DateNavigator';
import { EditAccountDrawer } from '@/modules/account/components/EditAccountDrawer';

const TransactionListView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionListView'),
  { ssr: false }
);

export default function AccountDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [editId, setEditId] = useState<string | null>(null);

  const accountId = String(id);

  const { data: account } = useAccountById(accountId, !!accountId);

  useTopNavPreset({
    title: account?.name ? account.name : 'Account',
    onBack: () => router.back(),
    onEdit: () => setEditId(accountId),
  });

  const { query, setQuery, getDateRangeKey, initializeListDefaults } =
    useTransactionFilterStore();
  const { groupBy } = query;

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
    timeframe: 'all',
    groupBy: groupBy,
    startDate,
    endDate,
    includeBalance: true,
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
            <h2 className='text-heading font-semibold'>Account History</h2>
          </div>
          <DateNavigator variant='dropdown' />
        </div>
        <p className='text-subheading text-muted-foreground mb-component'>
          Balance, settings, and payment schedule for this account.
        </p>
        <AccountSummaryBox account={account} />
      </section>

      <section>
        <TransactionListView
          isLoading={isLoading}
          data={groups}
          onItemClick={handleTransactionClick}
          onGroupClick={handleHeaderClick}
        />
      </section>
      {editId && (
        <EditAccountDrawer
          open={!!editId}
          accountId={editId}
          onClose={() => setEditId(null)}
        />
      )}
    </div>
  );
}
