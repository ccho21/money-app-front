'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import DateNavigator from '@/components/ui/check/DateNavigator';
import { useBudgetFormStore } from '@/modules/budget/formStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useBudgetGroup } from '@/modules/budget/hooks';
import type { BudgetCategoryPeriodItemDTO } from '@/modules/budget/types';

export default function ListBudgetCategoryPage() {
  const router = useRouter();
  const { categoryId } = useParams();
  const {
    query: { groupBy },
    setQuery,
    getDateRangeKey,
  } = useFilterStore();

  const { budgets, fetchGroupedBudgets, loading, error } = useBudgetGroup();

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
      await fetchGroupedBudgets(String(categoryId), {
        startDate,
        endDate,
        groupBy: 'monthly',
      });
      resetForm();
      setSelectedKey(null);
    };

    run();
  }, [categoryId, dateRangeKey, groupBy]);

  const handleSelect = (item: BudgetCategoryPeriodItemDTO) => {
    const path = item.categoryId
      ? `/budget/settings/${categoryId}/edit`
      : `/budget/settings/${categoryId}/new`;
    router.push(path);
  };

  if (!categoryId) {
    return <div className='p-4 text-sm text-error'>잘못된 접근입니다</div>;
  }

  if (loading) {
    return <p className='text-center mt-10 text-muted'>불러오는 중...</p>;
  }

  if (error) {
    return <p className='text-center mt-10 text-error'>{error}</p>;
  }

  return (
    <div>
      <DateNavigator withTransactionType={true} />
      <div className='divide-y'>
        {budgets.map((item) => (
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
