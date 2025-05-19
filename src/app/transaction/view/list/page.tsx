'use client';

import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import { TypographySmall } from '@/components/ui/typography';
import { Skeleton } from '@/components_backup/ui/skeleton';
import SummaryBox from '@/components/common/SummaryBox';
import DateNavigator from '@/components/navigation/DateNavigator';
import SubMenu from '@/components/navigation/SubMenu';

import {
  TransactionItem,
  GroupBy,
  TransactionGroupQuery,
} from '@/modules/transaction/types/types';
import {
  useTransactionGroupsQuery,
  useTransactionSummaryQuery,
} from '@/modules/transaction/hooks/queries';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';

const TransactionListView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionListView'),
  { ssr: false }
);

const SUBMENU_TABS = [
  { key: 'date', label: 'Date' },
  { key: 'category', label: 'Category' },
  { key: 'account', label: 'Account' },
];

export default function ListPage() {
  const router = useRouter();

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

  const [startDate, endDate] = getDateRangeKey().split('_');

  const queryParams: TransactionGroupQuery = {
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

  const setActiveSubMenu = (key: string) => {
    setQuery({ groupBy: key as GroupBy });
    router.replace(getQueryString());
  };

  if (isSummaryError || isGroupsError) {
    return <div className="text-sm text-destructive">Failed to load transactions.</div>;
  }

  if (isLoading) return <Skeleton className="h-40 w-full" />;
  if (!summary || !groupList) return null;

  return (
    <>
      <DateNavigator
        variant="pager"
        onNavigate={() => {
          router.replace(getQueryString());
        }}
      />

      <div className="mx-compact bg-background">
        <SummaryBox summary={summary} />
      </div>

      <div className="m-element">
        <SubMenu
          active={groupBy}
          onChange={setActiveSubMenu}
          tabs={SUBMENU_TABS}
        />
      </div>

      <div className="mx-element">
        <TypographySmall>All Transactions</TypographySmall>
        <TransactionListView
          isLoading={isLoading}
          data={groupList}
          onItemClick={handleTransactionClick}
          onGroupClick={handleHeaderClick}
        />
      </div>
    </>
  );
}