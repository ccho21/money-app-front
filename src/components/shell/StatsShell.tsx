'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import TopNav from '@/components/common/TopNav';
import TabMenu from '@/components/common/TabMenu';
import DateNavigator from '@/components/common/DateNavigator';
import StatsHeader from '@/app/stats/components/StatsHeader';

import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';
import { getDefaultLayoutOptions } from '@/lib/layout.config';
import { TransactionType } from '@/modules/transaction/types';
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

  const { hideTopNav, hideDateNav, hideStatsHeader, hideTabMenu } = useUIStore(
    (s) => s.layoutOptions
  );

  const setLayoutOptions = useUIStore((s) => s.setLayoutOptions);
  const resetLayoutOptions = useUIStore((s) => s.resetLayoutOptions);

  useEffect(() => {
    if (!isInitialized) {
      initializeFromParams(searchParams);
    }
  }, [initializeFromParams, isInitialized, searchParams]);

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
    <>
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
      <main className='flex-1 overflow-y-auto'>{children}</main>
    </>
  );
}
