// src/components/transaction/TransactionShell.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// import TopNav from '@/components/common/TopNav';
import { useFilterStore } from '@/stores/useFilterStore';
import { useTopNavPreset } from '@/app/hooks/useTopNavPreset';
import TopNav from '@/components_backup/common/TopNav';
import TabMenu from '@/components_backup/common/TabMenu';
import FilterSheet from '@/components/common/FilterSheet';

export default function TransactionShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { initializeFromParams, getQueryString, isInitialized } =
    useFilterStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeFromParams(searchParams);
    }
  }, [initializeFromParams, isInitialized, searchParams]);

  useTopNavPreset({
    title: 'Transactions',
    showSearchButton: true,
    showFilterButton: true,
    onFilterClick: () => setOpen(true), // ✅ 여기 꼭 넣어줘야 함!
  });

  const tabs = [
    { key: 'list', label: 'List' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'chart', label: 'Chart' },
  ];

  const queryString = useMemo(() => getQueryString(), [getQueryString]);
  const handleTabChange = (key: string) => {
    router.push(`/transaction/${key}${queryString}`);
  };

  const [open, setOpen] = useState(false);
  const tabKey = pathname.split('/')[2] ?? 'daily';

  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full px-compact'>
      <TopNav />
      <TabMenu tabs={tabs} active={tabKey} onChange={handleTabChange} />

      <div className='flex-1 overflow-y-auto'>{children}</div>
      <FilterSheet open={open} onOpenChange={setOpen} />
    </div>
  );
}
