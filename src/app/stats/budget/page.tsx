'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchStatsByBudget } from '@/features/stats/hooks';
import type { CategoryType } from '@/features/category/types';

import BudgetView from '../_components/BudgetView';
import EmptyMessage from '@/components/ui/EmptyMessage';
import { useRouter } from 'next/navigation';

//
// Budget stats overview page
//
export default function BudgetPage() {
  const router = useRouter();

  const { query, getDateRangeKey } = useFilterStore();
  const { date, groupBy, transactionType } = query;

  const budgetResponse = useStatsStore((s) => s.state.budgetResponse);
  const isLoading = useStatsStore((s) => s.state.isLoading);

  //
  // Build API params
  //
  const params = useMemo(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    return {
      startDate,
      endDate,
      type: transactionType as CategoryType,
      groupBy,
    };
  }, [getDateRangeKey, transactionType, groupBy]);

  //
  // Fetch budget stats on param change
  //
  useEffect(() => {
    fetchStatsByBudget(params);
  }, [params]);

  //
  // Handle click from chart/list
  //
  const handleClick = useCallback(
    (categoryId: string, hasBudget: boolean) => {
      if (hasBudget) {
        router.push(`/stats/budget/${categoryId}`);
      } else {
        router.push(`/budget/settings/${categoryId}/new`);
      }
    },
    [router]
  );

  //
  // Render loading or empty state
  //
  if (isLoading) return <p className='p-4 text-muted'>Loading...</p>;
  if (!budgetResponse) return <EmptyMessage />;

  //
  // Render view
  //
  return (
    <BudgetView
      transactionType={transactionType as CategoryType}
      budgetResponse={budgetResponse}
      handleClick={handleClick}
    />
  );
}
