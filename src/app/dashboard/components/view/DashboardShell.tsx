// src/components/dashboard/DashboardShell.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { useFilterStore } from '@/stores/useFilterStore';
import { useTopNavPreset } from '@/app/hooks/useTopNavPreset';
import BottomTabBar from '@/components/navigation/BottomNav';
import DateNavigator from '@/components/navigation/DateNavigator';

const TopNav = dynamic(() => import('@/components/navigation/TopNav'), {
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
    onSearch: () => {},
    onFilter: () => {},
  });

  return (
    <div className='min-h-screen pb-[10vh]'>
      <TopNav />
      <div className=''>{children}</div>
      <BottomTabBar />
    </div>
  );
}
