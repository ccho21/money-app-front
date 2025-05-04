'use client';

import { ReactNode, useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import TopNav from '@/components/common/TopNav';
import BottomTabBar from '@/components/common/BottomTabBar';
import TabMenu from '@/components/common/TabMenu';
// import DateNavigator from '@/components/common/DateNavigator';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';
import SummaryBox from '@/components/stats/SummaryBox';
import { useSummaryBoxItems } from '../hooks/useSummaryBoxItems';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { initializeFromParams, getQueryString, isInitialized } =
    useFilterStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeFromParams(searchParams);
    }
  }, [initializeFromParams, isInitialized, searchParams]);

  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Transactions',
      showFilterButton: true,
      showSearchButton: true,
    });
    return () => useUIStore.getState().resetTopNav();
  }, [router]);

  const tabs = [
    { key: 'daily', label: 'Daily' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'summary', label: 'Summary' },
  ];

  const queryString = useMemo(() => getQueryString(), [getQueryString]);
  const handleTabChange = (key: string) => {
    router.push(`/dashboard/${key}${queryString}`);
  };

  const tabKey = pathname.split('/')[2] ?? 'daily'; //
  const summaryItems = useSummaryBoxItems(tabKey);

  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full px-component'>
      <TopNav />
      <SummaryBox items={summaryItems} />
      {/* <DateNavigator /> */}
      <TabMenu
        tabs={tabs}
        active={tabKey}
        onChange={handleTabChange}
        variant='underline'
      />
      <div className='flex-1 overflow-y-auto'>{children}</div>
      <BottomTabBar />
      <Button
        size='sm'
        className='fixed bottom-[16vh] right-4 w-10 h-10'
        onClick={() => router.push('/transaction/new')}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
