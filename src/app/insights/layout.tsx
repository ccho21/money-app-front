'use client';

import { ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import TabMenu from '@/components/navigation/TabMenu';

export default function InsightsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [tab, setTab] = useState(() => {
    if (pathname.includes('/budget')) return 'budget';
    if (pathname.includes('/recurring')) return 'recurring';
    if (pathname.includes('/alerts')) return 'alerts';
    return 'pattern';
  });

  const tabs = [
    { key: 'pattern', label: 'Pattern' },
    { key: 'budget', label: 'Budget' },
    { key: 'recurring', label: 'Recurring' },
    { key: 'alerts', label: 'Alerts' },
  ];
  const labels: Record<string, string> = {
    pattern: 'Pattern',
    budget: 'Budget',
    recurring: 'Recurring',
    alerts: 'Alerts',
  };

  const handleTabChange = (value: string) => {
    setTab(value);
    router.push(`/insights${value === 'pattern' ? '' : `/${value}`}`);
  };

  const tabKey = pathname.split('/')[2] ?? 'daily';

  return (
    <div className='w-full min-h-screen px-component pb-[10vh] pt-component space-y-component'>
      {/* Page Title */}
      <div className='flex items-center justify-between'>
        <h1 className='text-heading font-semibold'>Spending Insights</h1>
      </div>

      {/* Tabs */}
      <TabMenu tabs={tabs} active={tabKey} onChange={handleTabChange} />


      {/* Content */}
      <div className='space-y-component'>{children}</div>
    </div>
  );
}
