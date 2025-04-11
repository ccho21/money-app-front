'use client';

import { useEffect } from 'react';
import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { getDateRangeKey } from '@/lib/date.util';
import { fetchStatsByBudget } from '@/services/statsService';
import type { CategoryType } from '@/features/category/types';

import BudgetView from '../_components/BudgetView';
import EmptyMessage from '@/components/ui/EmptyMessage';

export default function BudgetPage() {
  const { query } = useFilterStore();
  const { date, range, transactionType } = query;

  const {
    state: { budgetResponse, isLoading },
  } = useStatsStore();

  useEffect(() => {
    console.log('### RANGE', range);
    const [startDate, endDate] = getDateRangeKey(date, {
      unit: range,
      amount: 0,
    }).split('_');

    fetchStatsByBudget({
      startDate,
      endDate,
      type: transactionType as CategoryType,
    });
  }, [date, range, transactionType]);

  if (isLoading) return <p className='p-4 text-muted'>Loading...</p>;
  if (!budgetResponse) return <EmptyMessage />;

  return (
    <BudgetView
      transactionType={transactionType as CategoryType}
      totalRemaining={budgetResponse.totalRemaining}
      data={budgetResponse.data}
    />
  );
}
