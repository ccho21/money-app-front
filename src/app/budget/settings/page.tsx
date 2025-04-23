'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DateNavigator from '@/components/ui/check/DateNavigator';
import Panel from '@/components/ui/check/Panel';

import { useFilterStore } from '@/stores/useFilterStore';
import { useBudgetList } from '@/modules/budget/hooks';
import type { BudgetCategoryItemDTO } from '@/modules/budget/types';
import type { DateFilterParams } from '@/common/types';
import { CategoryListItem } from '@/app/stats/_components/CategoryListItem';

export default function BudgetSettingsPage() {
  const router = useRouter();
  const { query, getDateRangeKey } = useFilterStore();
  const { groupBy } = query;

  const { budgets, fetchBudgets, loading, error } = useBudgetList();

  useEffect(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      groupBy,
      startDate,
      endDate,
    };
    fetchBudgets(params);
  }, [getDateRangeKey, groupBy]);

  const handleClick = (categoryId: string, isNew: boolean) => {
    router.push(
      isNew
        ? `/budget/settings/${categoryId}/new`
        : `/budget/settings/${categoryId}/list`
    );
  };

  if (loading) {
    return <p className='text-center mt-10 text-muted'>불러오는 중...</p>;
  }

  if (error) {
    return <p className='text-center mt-10 text-error'>{error}</p>;
  }

  if (!budgets.length) {
    return (
      <p className='text-center mt-10 text-muted'>예산 데이터가 없습니다</p>
    );
  }

  return (
    <div>
      <DateNavigator withTransactionType={true} />
      <Panel>
        {budgets.map((item: BudgetCategoryItemDTO) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            amount={item.amount}
            color={item.color}
            onClick={() => handleClick(item.categoryId, item.amount === 0)}
          />
        ))}
      </Panel>
    </div>
  );
}
