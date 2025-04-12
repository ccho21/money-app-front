'use client';

import { useEffect, useMemo, useRef } from 'react';
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

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: range, amount: 0 }),
    [date, range],
  );

  const lastFetchKey = useRef<string | null>(null);

  useEffect(() => {
    const currentKey = `${transactionType}_${dateRangeKey}`;
    if (currentKey === lastFetchKey.current) return;

    const [startDate, endDate] = dateRangeKey.split('_');

    fetchStatsByBudget({
      startDate,
      endDate,
      type: transactionType as CategoryType,
    });

    lastFetchKey.current = currentKey;
  }, [transactionType, dateRangeKey]);

  if (isLoading) return <p className='p-4 text-muted'>Loading...</p>;
  if (!budgetResponse) return <EmptyMessage />;

  return (
    <BudgetView
      transactionType={transactionType as CategoryType}
      budgetResponse={budgetResponse}
    />
  );
}
