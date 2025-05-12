// src/app/category/layout.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import BottomTabBar from '@/components_backup/common/BottomNav';
import TopNav from '@/components_backup/common/TopNav';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/stores/useUIStore';

export default function CategoryLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Category.',
      onBack: () => router.back(),
      onAdd: () => {
        router.push('/category/new');
      },
    });

    return () => {
      useUIStore.getState().resetTopNav();
    };
  }, [router]);

  return (
    <div className='min-h-screen pb-tabbar flex flex-col bg-surface text-foreground'>
      <TopNav />
      <main className='flex-1 overflow-y-auto'>{children}</main>
      <BottomTabBar />
    </div>
  );
}
