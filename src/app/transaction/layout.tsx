'use client';

import { TransactionType } from '@/modules/transaction/types';
import { useTransactionFormStore } from '@/modules/transaction/formStore';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
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
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { state, actions } = useTransactionFormStore(); // ✅ 구조 기반 접근

  const [activeTab, setActiveTab] = useState<string>(state.type || 'expense');

  const handleTabChange = (key: string) => {
    if (['income', 'expense', 'transfer'].includes(key)) {
      setActiveTab(key);
      actions.setField('type', key as TransactionType);
    }
  };

  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Trans.',
      onBack: () => router.back(),
      // onAdd: () => router.push('/category/new'),
    });

    return () => {
      useUIStore.getState().resetTopNav(); // 💡 페이지 나가면 초기화
    };
  }, [router]);

  useEffect(() => {
    if (state.type && state.type !== activeTab) {
      setActiveTab(state.type);
    }
  }, [pathname, state.type, activeTab]);

  return (
    <div className='min-h-screen flex flex-col h-full'>
      <TopNav />
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
