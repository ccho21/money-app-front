'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import TopNav from '@/components/common/TopNav';
import BottomTabBar from '@/components/common/BottomTabBar';
import TabMenu from '@/components/common/TabMenu';
import DateNavigator from '@/components/common/DateNavigator';
import StatsHeader from './components/StatsHeader';

import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';
import { getDefaultLayoutOptions } from '@/lib/layout.config';
import { TransactionType } from '@/modules/transaction/types';

export default function StatsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { query, getQueryString, initializeFromParams } = useFilterStore();
  const { hideTopNav, hideDateNav, hideStatsHeader, hideTabMenu } = useUIStore(
    (s) => s.layoutOptions
  );
  const { transactionType } = query;

  const setLayoutOptions = useUIStore((s) => s.setLayoutOptions);
  const resetLayoutOptions = useUIStore((s) => s.resetLayoutOptions);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      initializeFromParams(searchParams);
      hasInitialized.current = true;
    }
  }, [initializeFromParams, searchParams]);

  const tabs = [
    { key: 'expense', label: 'Expense' },
    { key: 'income', label: 'Income' },
  ];

  const handleTabChange = (key: string) => {
    useFilterStore
      .getState()
      .setQuery({ transactionType: key as TransactionType });
    const newQuery = getQueryString(true);
    history.replaceState(null, '', newQuery); // router.replace도 가능
  };

  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    setLayoutOptions(getDefaultLayoutOptions(pathname));

    return () => {
      resetLayoutOptions(); // optional
    };
  }, [pathname, resetLayoutOptions, setLayoutOptions]);

  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      {!hideTopNav && <TopNav />}
      {!hideStatsHeader && <StatsHeader />}
      {!hideDateNav && <DateNavigator withTransactionType />}
      {!hideTabMenu && (
        <TabMenu
          tabs={tabs}
          active={transactionType}
          onChange={handleTabChange}
          variant='underline'
        />
      )}
      <main className='flex-1 overflow-y-auto bg-surface'>{children}</main>
      <BottomTabBar />
    </div>
  );
}
