// src/components/transaction/TransactionShell.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// import TopNav from '@/components/common/TopNav';
import { useTopNavPreset } from '@/app/hooks/useTopNavPreset';
import TopNav from '@/components/navigation/TopNav';
import TabMenu from '@/components/navigation/TabMenu';
import FilterSheet from '@/components/common/FilterSheet';
import { useTransactionFilterStore } from '../../stores/filterStore';

export default function TransactionShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { initializeFromParams, getQueryString, isInitialized } =
    useTransactionFilterStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeFromParams(searchParams);
    }
  }, [initializeFromParams, isInitialized, searchParams]);

  useTopNavPreset({
    title: 'Transactions',
    onAdd: undefined,
    onSearch: () => setOpen(true),
    onFilter: () => setOpen(true),
  });

  const tabs = [
    { key: 'list', label: 'List' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'chart', label: 'Chart' },
  ];

  const queryString = useMemo(() => getQueryString(), [getQueryString]);
  const handleTabChange = (key: string) => {
    router.push(`/transaction/view/${key}${queryString}`);
  };

  const [open, setOpen] = useState(false);
  const tabKey = pathname.split('/')[3] ?? 'list';

  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      <TopNav />
      <TabMenu tabs={tabs} active={tabKey} onChange={handleTabChange} />
      <div className='mb-element space-y-element'>
        <div className='flex-1 overflow-y-auto'>{children}</div>
      </div>
      <FilterSheet open={open} onOpenChange={setOpen} />
    </div>
  );
}
