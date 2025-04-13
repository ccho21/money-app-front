'use client';

import { useEffect, useMemo } from 'react';
import { useStatsStore } from '@/stores/useStatsStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchStatsByBudget } from '@/features/stats/hooks';
import type { CategoryType } from '@/features/category/types';

import BudgetView from '../_components/BudgetView';
import EmptyMessage from '@/components/ui/EmptyMessage';
import { useRouter } from 'next/navigation';

export default function BudgetPage() {
  const router = useRouter();
  const { query, getDateRangeKey } = useFilterStore();
  const { date, range, transactionType } = query;

  const {
    state: { budgetResponse, isLoading },
  } = useStatsStore();

  const dateRangeKey = useMemo(() => getDateRangeKey(), [getDateRangeKey]);
  const handleClick = (categoryId: string, hasBudget: boolean) => {
    if (hasBudget) {
      router.push(`/stats/budget/${categoryId}`);
    } else {
      router.push(`/budget/settings/${categoryId}/new`);
    }
  };

  useEffect(() => {
    const [startDate, endDate] = dateRangeKey.split('_');

    fetchStatsByBudget({
      startDate,
      endDate,
      type: transactionType as CategoryType,
    });
  }, [transactionType, dateRangeKey, date, range]);

  if (isLoading) return <p className='p-4 text-muted'>Loading...</p>;
  if (!budgetResponse) return <EmptyMessage />;

  return (
    <BudgetView
      transactionType={transactionType as CategoryType}
      budgetResponse={budgetResponse}
      handleClick={(categoryId: string, hasBudget: boolean) =>
        handleClick(categoryId, hasBudget)
      }
    />
  );
}
