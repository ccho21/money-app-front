'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import DateNavigator from '@/components/ui/check/DateNavigator';
import { useBudgetFormStore } from '@/modules/budget/formStore';
import { useFilterStore } from '@/stores/useFilterStore';
import type { BudgetCategoryPeriodItemDTO } from '@/modules/budget/types';
import { useBudgetStore } from '@/modules/budget/store';
import { fetchGroupedBudgetCategory } from '@/modules/budget/hooks';
import EmptyMessage from '@/components/ui/check/EmptyMessage';

export default function ListBudgetCategoryPage() {
  const router = useRouter();
  const { categoryId } = useParams();
  const {
    query: { groupBy },
    setQuery,
    getDateRangeKey,
  } = useFilterStore();

  const { budgetGroup, isLoading } = useBudgetStore();

  const resetForm = useBudgetFormStore((s) => s.resetForm);
  const [, setSelectedKey] = useState<string | null>(null);
  const dateRangeKey = getDateRangeKey();

  useEffect(() => {
    if (groupBy !== 'yearly') {
      setQuery({ groupBy: 'yearly' });
    }

    const run = async () => {
      if (!categoryId) return;

      const [startDate, endDate] = dateRangeKey.split('_');
      await fetchGroupedBudgetCategory(String(categoryId), {
        startDate,
        endDate,
        groupBy: 'monthly',
      });
      resetForm();
      setSelectedKey(null);
    };

    run();
  }, [categoryId, dateRangeKey, groupBy, resetForm, setQuery]);

  const handleSelect = (item: BudgetCategoryPeriodItemDTO) => {
    const path = item.categoryId
      ? `/budget/settings/${categoryId}/edit`
      : `/budget/settings/${categoryId}/new`;
    router.push(path);
  };

  if (!categoryId) {
    return <div className='p-4 text-sm text-error'>잘못된 접근입니다</div>;
  }

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>불러오는 중...</p>;
  }

  if (!budgetGroup) {
    return <EmptyMessage />;
  }

  return (
    <div>
      <DateNavigator withTransactionType={true} />
      <div className='divide-y'>
        {budgetGroup.budgets.map((item) => (
          <div
            key={item.rangeStart}
            className='p-4 cursor-pointer'
            onClick={() => handleSelect(item)}
          >
            <div className='flex justify-between'>
              <div>{item.label}</div>
              <div className='font-semibold'>
                {item.amount.toLocaleString()}원
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
