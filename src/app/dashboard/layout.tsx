'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import TopNav from '@/components/common/TopNav';
import BottomTabBar from '@/components/common/BottomTabBar';
import TabMenu from '@/components/common/TabMenu';

import { Plus } from 'lucide-react';
import { parseLocalDate, formatDate } from '@/lib/date.util';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';
import type { GroupBy } from '@/common/types';
import { Button } from '@/components/ui/check/Button';
import DateNavigator from '@/components/ui/check/DateNavigator';

const validRanges: GroupBy[] = ['daily', 'weekly', 'monthly', 'yearly'];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { query, setQuery } = useFilterStore();
  const { date, groupBy } = query;

  const hasInitialized = useRef(false);
  const currentTab = pathname.split('/')[2] || 'daily';

  const dateParam = searchParams.get('date');
  const groupByParam = searchParams.get('groupBy');

  // ✅ 최초 진입 시 쿼리 파라미터 → 상태로 반영
  useEffect(() => {
    if (hasInitialized.current) return;

    const patch: Partial<typeof query> = {};

    if (dateParam) {
      try {
        const parsed = parseLocalDate(dateParam);
        if (formatDate(parsed) !== formatDate(date)) {
          patch.date = parsed;
        }
      } catch (err) {
        console.warn('Invalid date param', err);
      }
    }

    if (groupByParam && validRanges.includes(groupByParam as GroupBy)) {
      if (groupBy !== groupByParam) {
        patch.groupBy = groupByParam as GroupBy;
      }
    }

    if (Object.keys(patch).length > 0) {
      setQuery(patch);
    }

    hasInitialized.current = true;
  }, [dateParam, groupByParam, setQuery, date, groupBy]);

  // ✅ 네비게이션 상단 타이틀 세팅
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

  const handleTabChange = (key: string) => {
    const currentDate = formatDate(date);
    router.push(`/dashboard/${key}?date=${currentDate}&groupBy=${groupBy}`);
  };

  return (
    <div className="min-h-screen pb-[10vh] flex flex-col h-full">
      <div>
        <TopNav />
        <DateNavigator />
        <TabMenu
          tabs={tabs}
          active={currentTab}
          variant="underline"
          onChange={handleTabChange}
        />
      </div>

      <div className="flex-1 overflow-y-auto bg-surface">{children}</div>

      <BottomTabBar />
      <Button
        variant="solid"
        className="fixed bottom-[16vh] right-4 w-10 h-10 bg-error text-white rounded-full shadow-md z-50 flex justify-center items-center hover:bg-error/80 dark:hover:bg-error/80"
        onClick={() => router.push('/transaction/new')}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
