'use client';

import { ReactNode, useEffect } from 'react';
import BottomTabBar from '@/components/common/BottomTabBar';
import TopNav from '@/components/common/TopNav';
import { useAccountFormStore } from '@/stores/useAccountFormStore';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/stores/useUIStore';

export default function AccountLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const {
    actions: { reset },
  } = useAccountFormStore();

  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Accounts.',
      onBack: () => router.back(),
      onAdd: () => {
        reset();
        router.push('/account/new');
      },
    });

    return () => {
      useUIStore.getState().resetTopNav(); // 💡 페이지 나가면 초기화
    };
  }, [router, reset]);
  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      <TopNav />
      <main className='flex-1 overflow-y-auto'>{children}</main>
      <BottomTabBar />
    </div>
  );
}
