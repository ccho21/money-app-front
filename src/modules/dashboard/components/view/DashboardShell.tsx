// src/components/dashboard/DashboardShell.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';

const TopNav = dynamic(() => import('@/components/navigation/TopNav'), {
  ssr: false,
});

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  useTopNavPreset({
    title: 'Dashboard',
  });

  return (
    <div className='min-h-screen pb-[10vh]'>
      <TopNav />
      <div className=''>{children}</div>
    </div>
  );
}
