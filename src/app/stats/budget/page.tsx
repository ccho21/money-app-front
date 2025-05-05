// src/app/stats/budget/page.tsx
'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { useStatsStore } from '@/modules/stats/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchBudgetStats } from '@/modules/stats/hooks';

import type { CategoryType } from '@/modules/category/types';

import EmptyMessage from '@/components/ui/empty/EmptyMessage';
import { useShallow } from 'zustand/shallow';
import { DateFilterParams } from '@/common/types';
import LoadingMessage from '@/components/ui/loading-message/LoadingMessage';
import dynamic from 'next/dynamic';
const BudgetView = dynamic(
  () => import('@/app/stats/budget/_components/BudgetView'),
  {
    ssr: false,
  }
);

export default function BudgetPage() {
  const router = useRouter();

  const { query, getDateRangeKey, isInitialized } = useFilterStore();
  const { groupBy, transactionType, date } = query;

  const { budgetGroup, isLoading } = useStatsStore(
    useShallow((s) => ({
      budgetGroup: s.budgetGroup,
      isLoading: s.isLoading,
    }))
  );

  useEffect(() => {
    if (!isInitialized) return;

    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      startDate,
      endDate,
      groupBy,
      type: transactionType as CategoryType,
    };

    fetchBudgetStats(params);
  }, [date, groupBy, transactionType, getDateRangeKey, isInitialized]);

  const handleClick = useCallback(
    (categoryId: string, hasBudget: boolean) => {
      router.push(
        hasBudget
          ? `/stats/budget/${categoryId}`
          : `/budget/settings/${categoryId}/new`
      );
    },
    [router]
  );

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (!budgetGroup || budgetGroup.items?.length === 0) {
    return <EmptyMessage />;
  }

  return (
    <BudgetView
      transactionType={transactionType as CategoryType}
      budgetGroup={budgetGroup}
      handleClick={handleClick}
    />
  );
}
