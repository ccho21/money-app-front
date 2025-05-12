// src/components/dashboard/DashboardShell.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { useFilterStore } from '@/stores/useFilterStore';
import { useTopNavPreset } from '@/app/hooks/useTopNavPreset';
import BottomTabBar from '@/components_backup/common/BottomNav';
import DateNavigator from '@/components/common/DateNavigator';

const TopNav = dynamic(() => import('@/components_backup/common/TopNav'), {
  ssr: false,
});

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  const { initializeFromParams, isInitialized } = useFilterStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeFromParams(searchParams);
    }
  }, [initializeFromParams, isInitialized, searchParams]);

  useTopNavPreset({
    title: 'Dashboard',
  });

  return (
    <div className='min-h-screen pb-[10vh]'>
      <div className='mb-component'>
        <TopNav />
      </div>
      <DateNavigator className='justify-end' />

      <div className=''>{children}</div>
      <BottomTabBar />
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
