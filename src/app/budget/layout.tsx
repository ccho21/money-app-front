'use client';

import BottomTabBar from '@/components/common/BottomTabBar';
import TopNav from '@/components/common/TopNav';
import { useUIStore } from '@/stores/useUIStore';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function BudgetLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Budget Settings.',
      onBack: () => router.back(),
    });

    return () => {
      useUIStore.getState().resetTopNav(); // 💡 페이지 나가면 초기화
    };
  }, [router]);
  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      <TopNav />
      <main className='flex-1 overflow-y-auto bg-surface'>{children}</main>
      <BottomTabBar />
    </div>
  );
}
