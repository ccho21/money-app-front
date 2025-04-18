'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import TopNav from '@/components/common/TopNav';
import BottomTabBar from '@/components/common/BottomTabBar';
import TabMenu from '@/components/common/TabMenu';
import DateNavigator from '@/components/ui/DateNavigator';
import { Button } from '@/components/ui/Button';

import { Plus } from 'lucide-react';
import { parseLocalDate, formatDate } from '@/lib/date.util';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';
import type { RangeOption } from '@/features/shared/types';

const validRanges: RangeOption[] = ['daily', 'weekly', 'monthly', 'yearly'];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const current = pathname.split('/')[2] || 'daily';
  const dateParam = searchParams.get('date');
  const rangeParam = searchParams.get('groupBy');

  const { query, setQuery } = useFilterStore();
  const { date, groupBy } = query;

  const hasInitialized = useRef(false); // ✅ 최초 1회만 실행 제어

  useEffect(() => {
    const partialQuery: Partial<typeof query> = {};
    let parsedDate: Date | null = null;

    // ✅ 최초 1회만 실행
    if (!hasInitialized.current) {
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

      if (rangeParam && validRanges.includes(rangeParam as RangeOption)) {
        if (groupBy !== rangeParam) {
          partialQuery.groupBy = rangeParam as RangeOption;
        }
      }

      if (Object.keys(partialQuery).length > 0) {
        setQuery(partialQuery);
      }

      hasInitialized.current = true;
    }

    // ✅ 매번 실행되어야 하는 부분
    // const needsFallback =
    //   !dateParam || !validRanges.includes(rangeParam as RangeOption);

    //   if (needsFallback) {
    //     const fallbackDate = new Date();

    //     setQuery({
    //       date: fallbackDate,
    //       groupBy: 'monthly',
    //     });

    //     // 선택: URL도 맞춰주고 싶다면 ↓
    //     const fallbackURL = `/dashboard/${current}?date=${formatDate(fallbackDate)}&groupBy=monthly`;
    //     router.replace(fallbackURL);
    //   }
  }, [dateParam, rangeParam, date, groupBy, current, setQuery, router]);

  useEffect(() => {
    useUIStore.getState().setTopNav({ title: 'Trans.' });
    return () => useUIStore.getState().resetTopNav();
  }, [router]);

  const tabs = [
    { key: 'daily', label: 'Daily' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'summary', label: 'Summary' },
  ];

  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      <div>
        <TopNav />
        <DateNavigator />
        <TabMenu
          tabs={tabs}
          active={current}
          variant='underline'
          onChange={(key) => {
            const currentDate = formatDate(date);
            router.push(
              `/dashboard/${key}?date=${currentDate}&groupBy=${groupBy}`
            );
          }}
        />
      </div>

      <div className='flex-1 overflow-y-auto bg-surface'>{children}</div>

      <BottomTabBar />
      <Button
        variant='solid'
        className='fixed bottom-[16vh] right-4 w-10 h-10 bg-error text-white rounded-full shadow-md z-50 flex justify-center items-center hover:bg-error/80 dark:hover:bg-error/80'
        onClick={() => router.push('/transaction/new')}
      >
        <Plus className='w-4 h-4' />
      </Button>
    </div>
  );
}
