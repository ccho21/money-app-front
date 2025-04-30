'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useBudgetFormStore } from '@/modules/budget/formStore';
import { useFilterStore } from '@/stores/useFilterStore';
import type { BudgetCategoryPeriodItemDTO } from '@/modules/budget/types';
import { useBudgetStore } from '@/modules/budget/store';
import { fetchGroupedBudgetCategory } from '@/modules/budget/hooks';
import EmptyMessage from '@/components/ui/empty/EmptyMessage';
import CurrencyDisplay from '@/components/ui/currency/CurrencyDisplay';

export default function ListBudgetCategoryPage() {
  const router = useRouter();
  const { categoryId } = useParams();
  const {
    query: { groupBy, date },
    setQuery,
    getDateRangeKey,
  } = useFilterStore();

  const { budgetGroup, isLoading } = useBudgetStore();
  const resetForm = useBudgetFormStore((s) => s.resetForm);
  const setField = useBudgetFormStore((s) => s.setField);
  const [, setSelectedKey] = useState<string | null>(null);
  const dateRangeKey = getDateRangeKey();

  useEffect(() => {
    const run = async () => {
      if (!categoryId) return;

      const [startDate, endDate] = dateRangeKey.split('_');
      resetForm();

      await fetchGroupedBudgetCategory(String(categoryId), {
        startDate,
        endDate,
        groupBy: 'monthly',
      });
      setSelectedKey(null);
    };

    run();
  }, [categoryId, dateRangeKey, groupBy, resetForm, setQuery, date]);

  const handleSelect = (item: BudgetCategoryPeriodItemDTO) => {
    setField('startDate', item.rangeStart);
    setField('endDate', item.rangeEnd);
    setField('type', item.type);
    setField('amount', item.amount);
    setField('categoryId', String(categoryId));

    const isEdit = !!item.categoryId;
    const path = isEdit
      ? `/budget/settings/${categoryId}/edit`
      : `/budget/settings/${categoryId}/new`;

    router.push(path);
  };

  if (!categoryId) {
    return <div className='p-4 text-sm text-error'>잘못된 접근입니다</div>;
  }

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center mt-20'>
        <p className='text-muted'>예산 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!budgetGroup || budgetGroup.budgets.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center mt-20'>
        <EmptyMessage />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col h-full'>
      <div className='p-4'>
        <h2 className='text-lg font-semibold mb-4'>이 카테고리의 예산 기록</h2>
        <div className='grid grid-cols-1 gap-4'>
          {budgetGroup.budgets.map((item) => (
            <div
              key={item.rangeStart}
              className='p-4 rounded-2xl shadow border hover:shadow-lg cursor-pointer transition'
              onClick={() => handleSelect(item)}
            >
              <div className='flex justify-between items-center mb-2'>
                <div className='text-base font-medium'>{item.label}</div>
                <div className='text-right font-bold text-primary text-lg'>
                  <CurrencyDisplay amount={item.amount}></CurrencyDisplay>
                </div>
              </div>
              {/* 향후 확장용: 사용률, 잔여금액 등 */}
              {/* <div className="text-sm text-muted">남은 금액: {item.remaining}</div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
