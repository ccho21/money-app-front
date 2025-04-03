'use client';

import { useEffect, useMemo } from 'react';
import { CategoryListItem } from '../stats/_components/CategoryListItem';
import { fetchBudgetsByCategory } from '@/services/budgetService';
import { DateFilterParams } from '@/features/shared/types';
import { useBudgetStore } from '@/stores/useBudgetStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { getDateRangeKey } from '@/lib/dateUtils';

export default function BudgetPage() {
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
    useDateFilterStore.getState().actions.setRange('monthly');

    const run = async () => {
      const [startDate, endDate] = dateRangeKey.split('_');
      const params: DateFilterParams = {
        groupBy: range,
        startDate,
        endDate,
      };
      console.log('### params', params);
      await fetchBudgetsByCategory(params);
    };
    run();
  }, [dateRangeKey, setRange, range]);

  const handleClick = () => {};

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
        {budgetCategoryResponse?.data.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            amount={item.budgetAmount}
            color={item.color}
            onClick={() => handleClick}
          ></CategoryListItem>
        ))}
      </div>
    </>
  );
}
