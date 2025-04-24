'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { useTransactionFormStore } from '@/modules/transaction/formStore';
import { TransactionType } from '@/modules/transaction/types';
import TopNav from '@/components/common/TopNav';
import TabMenu from '@/components/common/TabMenu';
import { useUIStore } from '@/stores/useUIStore';

const TABS = [
  { key: 'income', label: 'Income' },
  { key: 'expense', label: 'Expense' },
  { key: 'transfer', label: 'Transfer' },
];

export default function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const type = useTransactionFormStore((s) => s.state.type);
  const setField = useTransactionFormStore((s) => s.setField);
  const [activeTab, setActiveTab] = useState<string>(type || 'expense');

  const handleTabChange = (key: string) => {
    if (['income', 'expense', 'transfer'].includes(key)) {
      setActiveTab(key);
      setField('type', key as TransactionType);
    }
  };

  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Trans.',
      onBack: () => router.back(),
    });
    return () => {
      useUIStore.getState().resetTopNav();
    };
  }, [router]);

  useEffect(() => {
    if (type && type !== activeTab) {
      setActiveTab(type);
    }
  }, [pathname, type, activeTab]);

  return (
    <div className='min-h-screen flex flex-col h-full'>
      <TopNav />
      <TabMenu
        tabs={TABS}
        active={activeTab}
        onChange={handleTabChange}
        variant='pill'
      />
      <div className='flex-1 overflow-y-auto'>{children}</div>
    </div>
  );
}
