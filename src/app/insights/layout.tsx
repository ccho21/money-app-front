'use client';

import { ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import TabMenu from '@/components/navigation/TabMenu';
import TopNav from '@/components/navigation/TopNav';
import { useTopNavPreset } from '../../modules/shared/hooks/useTopNavPreset';

export default function InsightsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [tab, setTab] = useState(() => {
    if (pathname.includes('/budget')) return 'budget';
    if (pathname.includes('/recurring')) return 'recurring';
    if (pathname.includes('/alerts')) return 'alerts';
    return 'pattern';
  });

  useTopNavPreset({
    title: 'Spending Insights',
    onSearch: () => {},
    onFilter: () => {},
  });

  const tabs = [
    { key: 'pattern', label: 'Pattern' },
    { key: 'budget', label: 'Budget' },
    { key: 'recurring', label: 'Recurring' },
    { key: 'alerts', label: 'Alerts' },
  ];

  const handleTabChange = (value: string) => {
    setTab(value);
    router.push(`/insights${value === 'pattern' ? '' : `/${value}`}`);
  };

  return (
    <div className='layout-shell'>
      <TopNav />
      {/* Page Title */}

      {/* Tabs */}
      <TabMenu tabs={tabs} active={tab} onChange={handleTabChange} />

      {/* Content */}
      <main className='layout-body'>{children}</main>
    </div>
  );
}
