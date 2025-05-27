// src/app/budget/settings/[categoryId]/list/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useBudgetFormStore } from '@/modules/budget/formStore';
import { useFilterStore } from '@/stores/useFilterStore';
import type { BudgetCategoryPeriodItemDTO } from '@/modules/budget/types';
import { useBudgetStore } from '@/modules/budget/store';
import { fetchGroupedBudgetCategory } from '@/modules/budget/hooks';
import EmptyMessage from '@/components/ui/custom/emptyMessage';
import CurrencyDisplay from '@/components/ui/custom/currencyDisplay';

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
    return (
      <div className='p-component text-label text-error'>잘못된 접근입니다</div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center mt-section'>
        <p className='text-label text-muted'>
          예산 데이터를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (!budgetGroup || budgetGroup.budgets.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center mt-section'>
        <EmptyMessage />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col h-full bg-background text-foreground'>
      <div className='p-component'>
        <h2 className='text-heading font-semibold mb-component'>
          이 카테고리의 예산 기록
        </h2>
        <div className='grid grid-cols-1 gap-component'>
          {budgetGroup.budgets.map((item) => (
            <div
              key={item.rangeStart}
              className='p-component rounded-section shadow-md border hover:shadow-lg cursor-pointer transition'
              onClick={() => handleSelect(item)}
            >
              <div className='flex justify-between items-center mb-tight'>
                <div className='text-label font-medium'>{item.label}</div>
                <div className='text-body font-bold text-primary text-right'>
                  <CurrencyDisplay amount={item.amount} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
