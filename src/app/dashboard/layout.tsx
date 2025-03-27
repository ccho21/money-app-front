'use client';

import { ReactNode, useState } from 'react';
import BottomTabBar from '@/components/common/BottomTabBar';
import TopNav from '@/components/common/TopNav';
import TabMenu from '@/components/common/TabMenu';
import { usePathname, useRouter } from 'next/navigation';
import DateNavigator from '@/components/ui/DateNavigator';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [date, setDate] = useState(new Date());
  const pathname = usePathname();
  const router = useRouter();
  const current = pathname.split('/')[2] || 'daily';
  const tabs = [
    { key: 'daily', label: 'Daily' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'summary', label: 'Summary' },
  ];

  return (
    <div className='min-h-screen'>
      <TopNav title='Trans.' />
      <DateNavigator date={date} onChange={setDate} mode='year' />
      <TabMenu
        tabs={tabs}
        active={current}
        onChange={(key) => router.push(`/dashboard/${key}`)}
      />
      <div className='mb-3'></div>
      {children}
      <BottomTabBar />
      <button
        onClick={() => router.push('/transaction/new')}
        className='fixed bottom-20 right-4 w-14 h-14 bg-red-500 text-white text-3xl rounded-full shadow-lg z-40'
      >
        +
      </button>
    </div>
  );
}
