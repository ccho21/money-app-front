'use client';

import { useEffect, useMemo } from 'react';
import { DateFilterParams } from '@/features/shared/types';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { getDateRangeKey } from '@/lib/date.util';
import { BudgetCategory } from './_components/budget/types';
import { CategoryListItem } from '@/app/stats/_components/CategoryListItem';
import { fetchBudgetsByCategory } from './_components/budgetService';
import { useBudgetStore } from './_components/useBudgetStore';
import { useRouter } from 'next/navigation';

export default function BudgetPage() {
  const router = useRouter();
  const {
    state: { budgetCategoryResponse, isLoading },
  } = useBudgetStore();
  const {
    state: { date, range },
    actions: { setRange },
  } = useDateFilterStore();

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: 'monthly', amount: 0 }),
    [date]
  );

  // 🚀 페이지 마운트 시 데이터 fetch
  useEffect(() => {
    if (range !== 'monthly')
      useDateFilterStore.getState().actions.setRange('monthly');

    const run = async () => {
      const [startDate, endDate] = dateRangeKey.split('_');
      const params: DateFilterParams = {
        groupBy: range,
        startDate,
        endDate,
      };
      await fetchBudgetsByCategory(params);
    };
    run();
  }, [dateRangeKey, setRange, range]);

  const handleClick = (categoryId: string, isNew: boolean) => {
    isNew
      ? router.push(`/budget/settings/${categoryId}/new`)
      : router.push(`/budget/settings/${categoryId}/edit`);
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  // 🚫 데이터 없음
  if (!budgetCategoryResponse || !budgetCategoryResponse.data.length) {
    return <p className='text-center mt-10 text-gray-400'>데이터가 없습니다</p>;
  }

  return (
    <>
      <div>
        {budgetCategoryResponse?.data.map((item: BudgetCategory) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            amount={item.budgetAmount}
            color={item.color}
            onClick={() => handleClick(item.categoryId, item.isNew)}
          ></CategoryListItem>
        ))}
      </div>
    </>
  );
}
