'use client';

import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useBudgetFormStore } from '@/modules/budget/formStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { BudgetCategoryForm } from '@/app/budget/_components/BudgetCategoryForm';

export default function EditBudgetCategoryPage() {
  const { categoryId } = useParams();
  const getDateRangeKey = useFilterStore((s) => s.getDateRangeKey);
  const loadForm = useBudgetFormStore((s) => s.loadForm);
  const resetForm = useBudgetFormStore((s) => s.resetForm);
  const storeState = useBudgetFormStore((s) => s.form);

  // 🧹 useMemo로 초기 기본 날짜를 고정
  const [defaultStartDate, defaultEndDate] = useMemo(() => {
    const rangeKey = getDateRangeKey();
    return rangeKey.split('_');
  }, [getDateRangeKey]);

  useEffect(() => {
    if (!categoryId) return;

    resetForm();
    loadForm(String(categoryId), {
      startDate: storeState.startDate || defaultStartDate,
      endDate: storeState.endDate || defaultEndDate,
      groupBy: 'monthly',
    });
  }, [categoryId, loadForm, resetForm, defaultStartDate, defaultEndDate]);

  if (!categoryId) {
    return (
      <div className='p-4 text-sm text-error bg-surface text-center'>
        Category ID is missing.
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <main className='p-4'>
        <BudgetCategoryForm />
      </main>
    </div>
  );
}
