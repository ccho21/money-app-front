'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

import BottomTabBar from '@/components/common/BottomTabBar';
import DateNavigator from '@/components/ui/DateNavigator';
import StatsHeader from './_components/StatsHeader';
import TabMenu from '@/components/common/TabMenu';

import { useFilterStore } from '@/stores/useFilterStore';
import type { TransactionType } from '@/features/transaction/types';

export default function StatsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');

  const { query, setQuery, getQueryString } = useFilterStore();
  const { transactionType } = query;

  // ✅ 최초 진입 시 URL param을 store에 반영
  useEffect(() => {
    if (
      typeParam &&
      (typeParam === 'expense' || typeParam === 'income') &&
      typeParam !== transactionType
    ) {
      setQuery({ transactionType: typeParam as TransactionType });
    }
  }, [typeParam, transactionType, setQuery]);

  const tabs = [
    { key: 'expense', label: 'Expense' },
    { key: 'income', label: 'Income' },
  ];

  const handleTabChange = (key: string) => {
    setQuery({ transactionType: key as TransactionType });
    const syncedURL = getQueryString(true);
    router.replace(syncedURL);
  };

  return (
    <div className='min-h-screen pb-[10vh] flex flex-col bg-surface text-foreground'>
      <StatsHeader />
      <DateNavigator withTransactionType />
      <TabMenu
        tabs={tabs}
        active={transactionType}
        onChange={handleTabChange}
        variant='underline'
      />

      <main className='flex-1 overflow-y-auto px-4 pt-2 pb-20'>{children}</main>

      <BottomTabBar />
    </div>
  );
}
