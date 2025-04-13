// 파일 경로: src/app/budget/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DateNavigator from '@/components/ui/DateNavigator';
import Panel from '@/components/ui/Panel';
import { CategoryListItem } from '@/app/stats/_components/CategoryListItem';

import { useBudgetStore } from '@/stores/useBudgetStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchBudgetsByCategory } from '@/services/budgetService';

import type { BudgetCategory } from '@/features/budget/types';
import type { DateFilterParams } from '@/features/shared/types';

export default function BudgetPage() {
  const router = useRouter();

  const { query, getDateRangeKey: getRangeKey } = useFilterStore();
  const { range } = query;

  const {
    state: { budgetCategoryResponse, isLoading },
  } = useBudgetStore();

  useEffect(() => {
    const run = async () => {
      const [startDate, endDate] = getRangeKey().split('_');
      const params: DateFilterParams = {
        groupBy: range,
        startDate,
        endDate,
      };
      await fetchBudgetsByCategory(params);
    };
    run();
  }, [getRangeKey, range]);

  const handleClick = (categoryId: string, isNew: boolean) => {
    if (isNew) {
      router.push(`/budget/settings/${categoryId}/new`);
    } else {
      router.push(`/budget/settings/${categoryId}/list`);
    }
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>불러오는 중...</p>;
  }

  if (!budgetCategoryResponse || !budgetCategoryResponse.data.length) {
    return (
      <p className='text-center mt-10 text-muted'>예산 데이터가 없습니다</p>
    );
  }

  return (
    <div>
      <DateNavigator withTransactionType={true} />

      <Panel>
        {budgetCategoryResponse?.data.map((item: BudgetCategory) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            amount={item.budgetAmount}
            color={item.color}
            onClick={() => handleClick(item.categoryId, item.isNew)}
            showProgress={false}
          />
        ))}
      </Panel>
    </div>
  );
}
