'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import DateNavigator from '@/components/ui/DateNavigator';
import { fetchBudgetCategoriesByCategoryId } from '@/features/budget/hooks';
import { useBudgetStore } from '@/stores/useBudgetStore';
import { useBudgetCategoryFormStore } from '../../_components/useBudgetCategoryFormStore';
import { useFilterStore } from '@/stores/useFilterStore';

import { cn } from '@/lib/utils';
import type { DateFilterParams } from '@/features/shared/types';

export default function ListBudgetCategoryPage() {
  const router = useRouter();
  const { categoryId } = useParams();

  const { query, setQuery, getDateRangeKey } = useFilterStore();
  const { range } = query;

  const {
    state: { budgetCategoryGroupResponse },
  } = useBudgetStore();

  const { reset } = useBudgetCategoryFormStore((s) => s.actions);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const dateRangeKey = useMemo(() => getDateRangeKey(), [getDateRangeKey]);

  useEffect(() => {
    if (range !== 'yearly') {
      setQuery({ range: 'yearly' });
    }

    const run = async () => {
      if (!categoryId) return;

      const [startDate, endDate] = dateRangeKey.split('_');
      const filter: DateFilterParams = {
        startDate,
        endDate,
        groupBy: 'monthly',
      };

      await fetchBudgetCategoriesByCategoryId(String(categoryId), filter);
      reset();
      setSelectedKey(null);
    };

    run();
  }, [categoryId, dateRangeKey, range, setQuery, reset]);

  const budgets = budgetCategoryGroupResponse?.budgets ?? [];

  const handleSelect = (item: (typeof budgets)[0]) => {
    if (item.categoryId) {
      router.push(`/budget/settings/${categoryId}/edit`);
    } else {
      router.push(`/budget/settings/${categoryId}/new`);
    }
  };

  if (!categoryId) {
    return (
      <div className='p-4 text-sm text-error bg-surface text-center'>
        잘못된 접근입니다
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <DateNavigator withTransactionType={true} />
      <main className='p-4 space-y-4'>
        <div className='rounded-md bg-muted/10 dark:bg-muted/20 p-4 text-sm text-muted'>
          You can set the budget settings for each month. If you change the
          default budget, it will be applied starting next month.
        </div>

        <div className='space-y-2'>
          {budgets.map((b) => {
            const key = `${b.startDate}_${b.endDate}`;
            const isSelected = selectedKey === key;

            return (
              <button
                key={key}
                onClick={() => handleSelect(b)}
                className={cn(
                  'w-full flex justify-between items-center rounded-md border px-4 py-3 transition-all',
                  isSelected
                    ? 'border-error text-error'
                    : 'bg-surface hover:bg-muted/10 border-border text-foreground'
                )}
              >
                <span>{b.label}</span>
                <span>${b.budgetAmount.toFixed(2)}</span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
