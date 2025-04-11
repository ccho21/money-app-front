'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import BottomTabBar from '@/components/common/BottomTabBar';
import DateNavigator from '@/components/ui/DateNavigator';
import StatsHeader from './_components/StatsHeader';
import TabMenu from '@/components/common/TabMenu';

import { useFilterStore } from '@/stores/useFilterStore';
import { parseLocalDate, formatDate } from '@/lib/date.util';
import type { TransactionType } from '@/features/transaction/types';
import type { RangeOption } from '@/features/shared/types';

const validRanges: RangeOption[] = ['daily', 'weekly', 'monthly', 'yearly'];
const validTypes: TransactionType[] = ['expense', 'income'];

export default function StatsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateParam = searchParams.get('date');
  const rangeParam = searchParams.get('range');
  const typeParam = searchParams.get('type');

  const { query, setQuery, getQueryString } = useFilterStore();
  const { date, range, transactionType } = query;

  const hasInitialized = useRef(false); // 최초 1회 실행 제어

  useEffect(() => {
    const partialQuery: Partial<typeof query> = {};
    let parsedDate: Date | null = null;

    if (!hasInitialized.current) {
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

      // ✅ range 파싱
      if (rangeParam && validRanges.includes(rangeParam as RangeOption)) {
        if (range !== rangeParam) {
          partialQuery.range = rangeParam as RangeOption;
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
    }

    // ❌ fallback 처리 (쿼리 일부 없거나 잘못된 경우)
    // if (
    //   !parsedDate ||
    //   !validRanges.includes(rangeParam as RangeOption) ||
    //   !validTypes.includes(typeParam as TransactionType)
    // ) {
    //   const today = formatDate(new Date());
    //   const fallback = `/stats/category?date=${today}&range=monthly&type=expense`;
    //   router.replace(fallback);
    // }
  }, [dateParam, rangeParam, typeParam, date, range, transactionType, setQuery, router, pathname]);

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
