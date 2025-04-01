'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import BottomTabBar from '@/components/common/BottomTabBar';
import DateNavigator from '@/components/ui/DateNavigator';
import StatsHeader from './_components/StatsHeader';
import TabMenu from '@/components/common/TabMenu';
import { useDateFilterStore } from '@/stores/useDateFilterStore';

export default function StatsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'expense';
  const dateParam = searchParams.get('date');

  const {
    actions: { setDate },
  } = useDateFilterStore();

  // ✅ 최초 마운트 시 URL의 date → store 동기화
  useEffect(() => {
    if (dateParam) {
      const parsed = new Date(dateParam);
      if (!isNaN(parsed.getTime())) {
        setDate(parsed);
      }
    }
  }, [dateParam, setDate]);

  const tabs = [
    { key: 'expense', label: 'Expense' },
    { key: 'income', label: 'Income' },
  ];

  const handleTabChange = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', key);
    router.replace(`?${params.toString()}`); // URL만 변경
  };

  return (
    <div className="min-h-screen pb-[10vh] flex flex-col h-full">
      <StatsHeader />
      <DateNavigator />
      <TabMenu
        tabs={tabs}
        active={currentTab}
        onChange={handleTabChange}
        variant="underline"
      />
      <main className="flex-1 overflow-y-auto bg-gray-100">{children}</main>
      <BottomTabBar />
    </div>
  );
}
