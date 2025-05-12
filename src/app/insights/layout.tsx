'use client';

import { ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function InsightsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [tab, setTab] = useState(() => {
    if (pathname.includes('/budget')) return 'budget';
    if (pathname.includes('/recurring')) return 'recurring';
    if (pathname.includes('/alerts')) return 'alerts';
    return 'pattern';
  });

  const handleTabChange = (value: string) => {
    setTab(value);
    router.push(`/insights${value === 'pattern' ? '' : `/${value}`}`);
  };

  return (
    <div className='w-full min-h-screen px-component pb-[10vh] pt-component space-y-component'>
      {/* Page Title */}
      <div className='flex items-center justify-between'>
        <h1 className='text-heading font-semibold'>Spending Insights</h1>
      </div>

      {/* Tab Navigation */}
      <ToggleGroup
        type='single'
        value={tab}
        onValueChange={(value) => value && handleTabChange(value)}
        className='w-full grid grid-cols-4 gap-1'
      >
        <ToggleGroupItem value='pattern' className='w-full justify-center'>
          📊 Pattern
        </ToggleGroupItem>
        <ToggleGroupItem value='budget' className='w-full justify-center'>
          🎯 Budget
        </ToggleGroupItem>
        <ToggleGroupItem value='recurring' className='w-full justify-center'>
          🔁 Recurring
        </ToggleGroupItem>
        <ToggleGroupItem value='alerts' className='w-full justify-center'>
          ⚠️ Alerts
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Content */}
      <div className='space-y-component'>{children}</div>
    </div>
  );
}
