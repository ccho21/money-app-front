'use client';

import { TransactionType } from '@/features/transaction/types';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import TopNav from '@/components/common/TopNav';
import TabMenu from '@/components/common/TabMenu';

const TABS = [
  { key: 'income', label: 'Income' },
  { key: 'expense', label: 'Expense' },
  { key: 'transfer', label: 'Transfer' },
];

export default function TransactionLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const type = useTransactionFormStore((s) => s.type); // ✅ store에서 type 구독
  const [activeTab, setActiveTab] = useState<string>(type || 'expense');
  const setField = useTransactionFormStore((s) => s.setField);
  const router = useRouter();

  const handleTabChange = (key: string) => {
    if (['income', 'expense', 'transfer'].includes(key)) {
      setActiveTab(key);
      setField('type', key as TransactionType);
    }
  };

  useEffect(() => {
    if (type && type !== activeTab) {
      setActiveTab(type);
      setField('type', type);
    }
  }, [pathname, type, activeTab, setField]);

  return (
    <div className='min-h-screen flex flex-col h-full'>
      {/* ✅ 공통 TopNav 사용 */}
      <TopNav
        title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        onBack={router.back}
      />

      {/* ✅ 공통 TabMenu 사용 */}
      <TabMenu
        tabs={TABS}
        active={activeTab}
        onChange={handleTabChange}
        variant='pill'
      />

      {/* 폼 영역 */}
      <div className='flex-1 overflow-y-auto'>{children}</div>
    </div>
  );
}
