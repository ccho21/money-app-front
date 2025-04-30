'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DateNavigator from '@/components/common/DateNavigator';
import Panel from '@/components/ui/panel/Panel';

import { useFilterStore } from '@/stores/useFilterStore';
import type { BudgetCategoryItemDTO } from '@/modules/budget/types';
import type { DateFilterParams } from '@/common/types';
import { CategoryListItem } from '@/components/category/CategoryListItem';
import { useBudgetStore } from '@/modules/budget/store';
import { fetchBudgetsByCategory } from '@/modules/budget/hooks';

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
    return <p className='text-center mt-10 text-muted'>불러오는 중...</p>;
  }

  if (error) {
    return <p className='text-center mt-10 text-error'>{error}</p>;
  }

  if (!budgets) {
    return (
      <p className='text-center mt-10 text-muted'>예산 데이터가 없습니다</p>
    );
  }

  return (
    <div>
      <DateNavigator withTransactionType={true} />
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
