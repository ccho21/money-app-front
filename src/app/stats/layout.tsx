'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import BottomTabBar from '@/components/common/BottomTabBar';
import DateNavigator from '@/components/ui/check/DateNavigator';
import StatsHeader from './_components/StatsHeader';
import TabMenu from '@/components/common/TabMenu';
import { useFilterStore } from '@/stores/useFilterStore';
import { parseLocalDate, formatDate } from '@/lib/date.util';
import type { TransactionType } from '@/modules/transaction/types';
import type { GroupBy } from '@/common/types';
import { useUIStore } from '@/stores/useUIStore';
import TopNav from '@/components/common/TopNav';
import { getDefaultLayoutOptions } from '@/lib/layout.config';

const validRanges: GroupBy[] = ['daily', 'weekly', 'monthly', 'yearly'];
const validTypes: TransactionType[] = ['expense', 'income'];

export default function StatsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateParam = searchParams.get('date');
  const rangeParam = searchParams.get('groupBy');
  const typeParam = searchParams.get('type');

  const setLayoutOptions = useUIStore((s) => s.setLayoutOptions);
  const resetLayoutOptions = useUIStore((s) => s.resetLayoutOptions);

  const { query, setQuery, getQueryString } = useFilterStore();
  const { date, groupBy, transactionType } = query;

  const { hideTopNav, hideDateNav, hideStatsHeader, hideTabMenu } = useUIStore(
    (s) => s.layoutOptions
  );

  const hasInitialized = useRef(false);

  // 👉 레이아웃 옵션 동기화
  useEffect(() => {
    setLayoutOptions(getDefaultLayoutOptions(pathname));
    return resetLayoutOptions;
  }, [pathname, setLayoutOptions, resetLayoutOptions]);

  // 👉 쿼리 파싱 후 store 반영 (최초 1회)
  useEffect(() => {
    if (hasInitialized.current) return;

    const partialQuery: Partial<typeof query> = {};
    let parsedDate: Date | null = null;

    // ✅ date 파싱
    if (dateParam) {
      try {
        parsedDate = parseLocalDate(dateParam);
        if (formatDate(parsedDate) !== formatDate(date)) {
          partialQuery.date = parsedDate;
        }
      } catch (err) {
        console.log('❌ Invalid dateParam', err);
      }
    }

    // ✅ groupBy 파싱
    if (rangeParam && validRanges.includes(rangeParam as GroupBy)) {
      if (groupBy !== rangeParam) {
        partialQuery.groupBy = rangeParam as GroupBy;
      }
    }

    // ✅ type 파싱
    if (typeParam && validTypes.includes(typeParam as TransactionType)) {
      if (transactionType !== typeParam) {
        partialQuery.transactionType = typeParam as TransactionType;
      }
    }

    if (Object.keys(partialQuery).length > 0) {
      setQuery(partialQuery);
    }

    hasInitialized.current = true;
  }, [
    dateParam,
    rangeParam,
    typeParam,
    date,
    groupBy,
    transactionType,
    setQuery,
  ]);

  const tabs = [
    { key: 'expense', label: 'Expense' },
    { key: 'income', label: 'Income' },
  ];

  const handleTabChange = (key: string) => {
    setQuery({ transactionType: key as TransactionType });
    const syncedURL = getQueryString(true); // type 포함
    router.replace(syncedURL);
  };

  return (
    <div className="min-h-screen pb-[10vh] flex flex-col h-full">
      {!hideTopNav && <TopNav />}
      {!hideStatsHeader && <StatsHeader />}
      {!hideDateNav && <DateNavigator withTransactionType />}
      {!hideTabMenu && (
        <TabMenu
          tabs={tabs}
          active={transactionType}
          onChange={handleTabChange}
          variant="underline"
        />
      )}

      <main className="flex-1 overflow-y-auto bg-surface">{children}</main>

      <BottomTabBar />
    </div>
  );
}
