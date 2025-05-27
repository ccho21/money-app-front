// src/components/transaction/TransactionShell.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';
import { useTransactionFilterStore } from '../../stores/filterStore';
import dynamic from 'next/dynamic';

const TopNav = dynamic(() => import('@/components/navigation/TopNav'), {
  ssr: false,
});
const TabMenu = dynamic(() => import('@/components/navigation/TabMenu'), {
  ssr: false,
});
const SearchDialog = dynamic(
  () => import('@/components/ui/custom/SearchDialog'),
  {
    ssr: false,
  }
);
const FilterSheet = dynamic(() => import('@/components/common/FilterSheet'), {
  ssr: false,
});

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
    onSearch: () => setSearchOpen(true),
    onFilter: () => setFilterOpen(true),
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

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const tabKey = pathname.split('/')[3] ?? 'list';

  return (
    <div className='layout-shell'>
      <TopNav />
      <TabMenu tabs={tabs} active={tabKey} onChange={handleTabChange} />

      <main className='layout-body'>{children}</main>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <FilterSheet open={filterOpen} onOpenChange={setFilterOpen} />
    </div>
  );
}
