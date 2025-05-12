// src/components/dashboard/DashboardShell.tsx
'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { Button } from '@/components_backup/ui/button/Button';
import { useFilterStore } from '@/stores/useFilterStore';
import { useTopNavPreset } from '@/app/hooks/useTopNavPreset';
import { Plus } from 'lucide-react';
import BottomTabBar from '@/components_backup/common/BottomNav';
import TabMenu from '@/components_backup/common/TabMenu';

const TopNav = dynamic(() => import('@/components_backup/common/TopNav'), {
  ssr: false,
});

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
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

  useTopNavPreset({
    title: 'Transactions',
    showSearchButton: false,
    showFilterButton: false,
    onAdd: () => router.push('/transaction/new'),
  });

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

  const tabKey = pathname.split('/')[2] ?? 'daily';

  return (
    <div className='min-h-screen pb-[10vh]'>
      <TopNav />
      <TabMenu
        tabs={tabs}
        active={tabKey}
        onChange={handleTabChange}
      />

      <div className=''>{children}</div>
      {/* <BottomTabBar /> */}
      {/* <Button
        size='sm'
        className='fixed bottom-[10vh] right-4 w-10 h-10'
        onClick={() => router.push('/transaction/new')}
      >
        <Plus />
      </Button> */}
    </div>
  );
}
