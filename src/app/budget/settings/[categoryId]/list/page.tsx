'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import DateNavigator from '@/components/ui/check/DateNavigator';
import { fetchBudgetCategoriesByCategoryId } from '@/features/budget/hooks';
import { useBudgetStore } from '@/stores/useBudgetStore';
import { useFilterStore } from '@/stores/useFilterStore';

import { cn } from '@/lib/utils';
import type { DateFilterParams } from '@/features/shared/types';
import { useBudgetCategoryFormStore } from '@/stores/forms/useBudgetCategoryFormStore';
import type { BudgetCategoryPeriodItemDTO } from '@/features/budget/types';

export default function ListBudgetCategoryPage() {
  const router = useRouter();
  const { categoryId } = useParams();

  const {
    query: { groupBy },
    setQuery,
    getDateRangeKey,
  } = useFilterStore();

  const {
    state: { budgetCategoryGroupResponse },
  } = useBudgetStore();

  const { reset } = useBudgetCategoryFormStore((s) => s.actions);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const dateRangeKey = getDateRangeKey(); // called immediately

  useEffect(() => {
    if (groupBy !== 'yearly') {
      setQuery({ groupBy: 'yearly' });
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
  }, [categoryId, dateRangeKey, groupBy, setQuery, reset]);

  const budgets = budgetCategoryGroupResponse?.budgets ?? [];

  const handleSelect = (item: BudgetCategoryPeriodItemDTO) => {
    const path = item.categoryId
      ? `/budget/settings/${categoryId}/edit`
      : `/budget/settings/${categoryId}/new`;
    router.push(path);
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
            const key = `${b.rangeStart}_${b.rangeEnd}`;
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
                <span>${b.amount.toFixed(2)}</span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
