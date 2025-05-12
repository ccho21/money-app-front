'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import TopNav from '@/components_backup/common/TopNav';
import TabMenu from '@/components_backup/common/TabMenu';
import DateNavigator from '@/components/common/DateNavigator';
import StatsHeader from '@/app/stats/components/StatsHeader';

import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';
import { getDefaultLayoutOptions } from '@/lib/layout.config';
import { TransactionType } from '@/modules/transaction/types';
import BottomTabBar from '../common/BottomNav';
import { GroupBy } from '@/common/types';
import { useTopNavPreset } from '@/app/hooks/useTopNavPreset';
export default function StatsShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { query, getQueryString, initializeFromParams, isInitialized } =
    useFilterStore();
  const { transactionType } = query;

  const { hideDateNav, hideStatsHeader, hideTabMenu } = useUIStore(
    (s) => s.layoutOptions
  );

  const setLayoutOptions = useUIStore((s) => s.setLayoutOptions);
  const resetLayoutOptions = useUIStore((s) => s.resetLayoutOptions);

  useEffect(() => {
    if (!isInitialized) {
      initializeFromParams(searchParams);
    }
  }, [initializeFromParams, isInitialized, searchParams]);

  useTopNavPreset({
    title: 'Stats',
  });

  const tabs = useMemo(
    () => [
      { key: 'expense', label: 'Expense' },
      { key: 'income', label: 'Income' },
    ],
    []
  );

  const handleTabChange = useCallback(
    (key: string) => {
      useFilterStore
        .getState()
        .setQuery({ transactionType: key as TransactionType });
      const newQuery = getQueryString(true);
      router.replace(newQuery);
    },
    [getQueryString, router]
  );

  const handlerRouterChange = useCallback(
    (href: string) => {
      const newQuery = getQueryString(true);
      router.replace(`${href}${newQuery}`);
    },
    [router]
  );

  const handleRangeChange = (range: GroupBy) => {
    if (query.groupBy !== range) {
      useFilterStore.getState().setQuery({ groupBy: range });
      router.replace(getQueryString(true));
    }
  };

  const prevPath = useRef<string | null>(null);
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    setLayoutOptions(getDefaultLayoutOptions(pathname));

    return () => {
      resetLayoutOptions();
    };
  }, [pathname, resetLayoutOptions, setLayoutOptions]);

  return (
    <div className='bg-background'>
      <TopNav />
      {!hideStatsHeader && (
        <StatsHeader
          pathname={pathname}
          groupBy={query.groupBy}
          transactionType={transactionType}
          onTabChange={handlerRouterChange}
          onRangeSelect={handleRangeChange}
          onTypeChange={handleTabChange}
        />
      )}
      {/* {!hideTabMenu && (
        <TabMenu
          tabs={tabs}
          active={transactionType}
          onChange={handleTabChange}
        />
      )} */}
      {!hideDateNav && <DateNavigator />}

      <main className='flex-1 overflow-y-auto'>{children}</main>
      {/* <BottomTabBar /> */}
    </div>
  );
}
