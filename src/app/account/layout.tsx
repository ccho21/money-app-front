'use client';

import { ReactNode } from 'react';
import BottomTabBar from '@/components/common/BottomTabBar';
import TopNav from '@/components/common/TopNav';
// import { useAccountFormStore } from '@/stores/useAccountFormStore';
import { useRouter } from 'next/navigation';

export default function AccountLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  // const { toggleEditMode } = useAccountFormStore();

  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      <TopNav
        title={'Accounts'}
        onBack={() => history.back()}
        // onEdit={() => alert('coming soon!')}
        onAdd={() => router.push('/account/new')}
      />
      <main className='flex-1 overflow-y-auto'>{children}</main>
      <BottomTabBar />
    </div>
  );
}
