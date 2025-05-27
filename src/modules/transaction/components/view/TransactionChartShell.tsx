'use client';

import { ReactNode, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SubMenu from '@/components/navigation/SubMenu';
import DateNavigator from '@/components/navigation/DateNavigator';

interface Props {
  children: ReactNode;
}

const VIEW_MODES = [
  { key: 'flow', label: 'Flow', context: 'monthly', title: 'Monthly Overview' },
  {
    key: 'category',
    label: 'Category',
    context: 'category',
    title: 'Overview',
  },
  { key: 'budget', label: 'Budget', context: 'budget', title: 'Overview' },
  { key: 'account', label: 'Account', context: 'account', title: 'Overview' },
];

export default function TransactionChartShell({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabFromPath = pathname?.split('/')[4] ?? 'flow';
  const [currentView, setCurrentView] = useState(tabFromPath);

  // ⚙️ context 결정
  const context = useMemo(() => {
    return VIEW_MODES.find((v) => v.key === currentView)?.context ?? 'monthly';
  }, [currentView]);

  const title = useMemo(() => {
    return VIEW_MODES.find((v) => v.key === currentView)?.title ?? 'Overview';
  }, [currentView]);

  const handleTabChange = (key: string) => {
    setCurrentView(key);
    router.replace(
      `/transaction/view/chart/${key}${
        searchParams.toString() ? `?${searchParams}` : ''
      }`
    );
  };

  return (
    <div className='w-full min-h-screen pb-[10vh] pt-element space-y-component'>
      <section className=''>
        <div className='flex justify-between items-center'>
          <h2 className='text-heading font-semibold'>{title}</h2>
          <DateNavigator
            variant={context === 'monthly' ? 'year' : 'dropdown'}
          />
        </div>
        <p className='text-subheading text-gray-500'>
          Insights based on your {context} data
        </p>
      </section>

      <SubMenu
        active={currentView}
        onChange={handleTabChange}
        tabs={VIEW_MODES.map(({ key, label }) => ({ key, label }))}
      />

      <div className='space-y-component'>{children}</div>
    </div>
  );
}
