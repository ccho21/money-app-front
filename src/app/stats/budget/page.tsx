'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { useStatsStore } from '@/modules/stats/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchBudgetStats } from '@/modules/stats/hooks';

import type { CategoryType } from '@/modules/category/types';

import BudgetView from '../_components/BudgetView';
import EmptyMessage from '@/components/ui/check/EmptyMessage';
import { useShallow } from 'zustand/shallow';

export default function BudgetPage() {
  const router = useRouter();

  const { query, getDateRangeKey } = useFilterStore();
  const { transactionType, groupBy } = query;

  const [startDate, endDate] = getDateRangeKey().split('_');

  const params = useMemo(
    () => ({
      startDate,
      endDate,
      groupBy,
      type: transactionType as CategoryType,
    }),
    [startDate, endDate, groupBy, transactionType]
  );

  const { budgetGroup, isLoading } = useStatsStore(
    useShallow((s) => ({
      budgetGroup: s.budgetGroup,
      isLoading: s.isLoading,
    }))
  );

  useEffect(() => {
    fetchBudgetStats(params);
  }, [params]);

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
    return <p className='p-4 text-muted'>Loading...</p>;
  }

  if (!budgetGroup || budgetGroup.items?.length === 0) {
    return <EmptyMessage />;
  }

  return (
    <BudgetView
      transactionType={transactionType as CategoryType}
      budgetResponse={budgetGroup}
      handleClick={handleClick}
    />
  );
}
