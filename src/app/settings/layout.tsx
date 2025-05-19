// src/app/more/layout.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import TopNav from '@/components/navigation/TopNav';
import { useUIStore } from '@/stores/useUIStore';

export default function MoreLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Settings.',
    });

    return () => {
      useUIStore.getState().resetTopNav(); // 💡 페이지 나가면 초기화
    };
  }, []);

  return (
    <div className='min-h-screen flex flex-col bg-surface text-foreground'>
      <TopNav />
      <main className='flex-1 overflow-y-auto'>{children}</main>
    </div>
  );
}
