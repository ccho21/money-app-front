// 📄 경로: src/app/budget/page.tsx
'use client';

import { useEffect, useMemo } from 'react';
import { DateFilterParams } from '@/features/shared/types';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { getDateRangeKey } from '@/lib/date.util';
import { BudgetCategory } from '../../../features/budget/types';
import { CategoryListItem } from '@/app/stats/_components/CategoryListItem';
import { fetchBudgetsByCategory } from '../../../services/budgetService';
import { useBudgetStore } from '../../../stores/useBudgetStore';
import { useRouter } from 'next/navigation';
import DateNavigator from '@/components/ui/DateNavigator';
import Panel from '@/components/ui/Panel';

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
    () => getDateRangeKey(date, { unit: range, amount: 0 }),
    [date, range]
  );

  useEffect(() => {
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
    <div className='bg-background min-h-screen pb-[10vh]'>
      <DateNavigator withTransactionType={true} />

      <Panel>
        {budgetCategoryResponse?.data.map((item: BudgetCategory) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            amount={item.budgetAmount}
            color={item.color}
            onClick={() => handleClick(item.categoryId, item.isNew)}
          />
        ))}
      </Panel>
    </div>
  );
}
