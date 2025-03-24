'use client';

import { ReactNode } from 'react';
import TopNav from '@/components/ui/TopNav';
import TabMenu from '@/components/ui/TabMenu';
import BottomTabBar from '@/components/ui/BottomTabBar';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
      <div className="min-h-screen pb-16">
        <TopNav title="Trans." />
        <TabMenu tabs={tabs} active={current} onChange={(key) => router.push(`/dashboard/${key}`)} />
        {children}
        <BottomTabBar />
      </div>
  );
}
