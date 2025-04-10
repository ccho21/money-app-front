'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import BottomTabBar from '@/components/common/BottomTabBar';
import DateNavigator from '@/components/ui/DateNavigator';
import StatsHeader from './_components/StatsHeader';
import TabMenu from '@/components/common/TabMenu';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { TransactionType } from '@/features/transaction/types';

export default function StatsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');

  const {
    actions: { setTransactionType, getSyncedURLFromState },
    state: { transactionType },
  } = useDateFilterStore();

  // ✅ 최초 마운트 시 URL의 date → store 동기화
  useEffect(() => {
    if (typeParam) {
      setTransactionType(typeParam as TransactionType);
    }
  }, [typeParam, transactionType, setTransactionType]);

  const tabs = [
    { key: 'expense', label: 'Expense' },
    { key: 'income', label: 'Income' },
  ];

  const handleTabChange = (key: string) => {
    setTransactionType(key as TransactionType);
    const syncedURL = getSyncedURLFromState(true);
    router.replace(`${syncedURL}`);
  };

  return (
    <div className="min-h-screen pb-[10vh] flex flex-col bg-surface text-foreground">
      {/* 상단 헤더 + 날짜 내비 + 탭 */}
      <StatsHeader />
      <DateNavigator withTransactionType />
      <TabMenu
        tabs={tabs}
        active={transactionType}
        onChange={handleTabChange}
        variant="underline"
      />

      {/* 콘텐츠 영역 */}
      <main className="flex-1 overflow-y-auto px-4 pt-2 pb-20">{children}</main>

      {/* 하단 탭 */}
      <BottomTabBar />
    </div>
  );
}
