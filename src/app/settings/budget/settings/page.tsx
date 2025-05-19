// src/app/budget/settings/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DateNavigator from '@/components/navigation/DateNavigator';
import Panel from '@/components_backup/ui/panel/Panel';

import { useFilterStore } from '@/stores/useFilterStore';
import type { BudgetCategoryItemDTO } from '@/modules/budget/types';
import type { DateFilterParams } from '@/common/types';
import { CategoryListItem } from '@/components_backup/category/CategoryListItem';
import { useBudgetStore } from '@/modules/budget/store';
import { fetchBudgetsByCategory } from '@/modules/budget/hooks';
import EmptyMessage from '@/components/ui/custom/emptyMessage';
import LoadingMessage from '@/components/ui/custom/loadingMessage';

export default function BudgetSettingsPage() {
  const router = useRouter();
  const { query, getDateRangeKey } = useFilterStore();
  const { groupBy } = query;

  const { budgets, isLoading, error } = useBudgetStore();

  useEffect(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      groupBy,
      startDate,
      endDate,
    };
    fetchBudgetsByCategory(params);
  }, [getDateRangeKey, groupBy]);

  const handleClick = (categoryId: string, isNew: boolean) => {
    router.push(
      isNew
        ? `/budget/settings/${categoryId}/new`
        : `/budget/settings/${categoryId}/list`
    );
  };

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (!budgets) {
    return <EmptyMessage />;
  }

  return (
    <div className='bg-surface text-foreground min-h-screen'>
      <DateNavigator />
      <Panel>
        {budgets.items.map((item: BudgetCategoryItemDTO) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            amount={item.amount}
            color={item.color}
            onClick={() => handleClick(item.categoryId, item.amount === 0)}
            showProgress={false}
          />
        ))}
      </Panel>
    </div>
  );
}
