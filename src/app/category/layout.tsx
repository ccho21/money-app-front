'use client';

import { ReactNode } from 'react';
import BottomTabBar from '@/components/common/BottomTabBar';
import TopNav from '@/components/common/TopNav';
import { useRouter } from 'next/navigation';

export default function CategoryLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className='min-h-screen pb-[10vh] flex flex-col'>
      <TopNav
        title={'Categories. '}
        onBack={() => history.back()}
        // onEdit={() => alert('coming soon!')}
        onAdd={() => router.push('/category/new')}
      />
      <main className='flex-1 overflow-y-auto'>{children}</main>
      <BottomTabBar />
    </div>
  );
}
