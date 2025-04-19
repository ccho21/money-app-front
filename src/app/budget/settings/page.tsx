// 📁 src/app/budget/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DateNavigator from '@/components/ui/check/DateNavigator';
import Panel from '@/components/ui/check/Panel';
import { CategoryListItem } from '@/app/stats/_components/CategoryListItem';

import { useBudgetStore } from '@/stores/useBudgetStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchBudgetsByCategory } from '@/features/budget/hooks';

import type { BudgetCategoryItemDTO } from '@/features/budget/types';
import type { DateFilterParams } from '@/features/shared/types';

export default function BudgetPage() {
  const router = useRouter();

  const { query, getDateRangeKey } = useFilterStore();
  const { groupBy } = query;

  const {
    state: { budgetCategoryResponse, isLoading },
  } = useBudgetStore();

  useEffect(() => {
    const run = async () => {
      const [startDate, endDate] = getDateRangeKey().split('_');
      const params: DateFilterParams = {
        groupBy: groupBy,
        startDate,
        endDate,
      };
      await fetchBudgetsByCategory(params);
    };
    run();
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

  const items = budgetCategoryResponse?.items ?? [];

  if (!items.length) {
    return (
      <p className='text-center mt-10 text-muted'>예산 데이터가 없습니다</p>
    );
  }

  return (
    <div>
      <DateNavigator withTransactionType={true} />

      <Panel>
        {items.map((item: BudgetCategoryItemDTO) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            amount={item.amount}
            color={item.color}
            onClick={() => handleClick(item.categoryId, !item.budgetId)}
            showProgress={false}
          />
        ))}
      </Panel>
    </div>
  );
}
