'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';

import { useBudgetFormStore } from '@/modules/budget/formStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { BudgetCategoryForm } from '@/app/budget/components/BudgetCategoryForm';

export default function EditBudgetCategoryPage() {
  const { categoryId } = useParams();
  const getDateRangeKey = useFilterStore((s) => s.getDateRangeKey);
  const loadForm = useBudgetFormStore((s) => s.loadForm);
  const resetForm = useBudgetFormStore((s) => s.resetForm);
  const storeState = useBudgetFormStore((s) => s.form);

  const initialized = useRef(false); // ✅ 최초 실행 여부를 기억하는 ref

  const [defaultStartDate, defaultEndDate] = useMemo(() => {
    const rangeKey = getDateRangeKey();
    return rangeKey.split('_');
  }, [getDateRangeKey]);

  useEffect(() => {
    if (!categoryId) return;
    if (initialized.current) return; // ✅ 이미 초기화했으면 재실행 막기

    resetForm();
    loadForm(String(categoryId), {
      startDate: storeState.startDate || defaultStartDate,
      endDate: storeState.endDate || defaultEndDate,
      groupBy: 'monthly',
    });

    initialized.current = true; // ✅ 딱 1번만 실행하도록 플래그 세팅
  }, [
    categoryId,
    loadForm,
    resetForm,
    defaultStartDate,
    defaultEndDate,
    storeState.startDate,
    storeState.endDate,
  ]);

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
