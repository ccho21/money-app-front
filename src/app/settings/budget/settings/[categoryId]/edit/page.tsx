// src/app/budget/settings/[categoryId]/edit/page.tsx
'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';

import { useBudgetFormStore } from '@/modules/budget/formStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { BudgetCategoryForm } from '@/app/settings/budget/components/BudgetCategoryForm';
import EmptyMessage from '@/components/ui/custom/emptyMessage';

export default function EditBudgetCategoryPage() {
  const { categoryId } = useParams();
  const getDateRangeKey = useFilterStore((s) => s.getDateRangeKey);
  const loadForm = useBudgetFormStore((s) => s.loadForm);
  const resetForm = useBudgetFormStore((s) => s.resetForm);
  const storeState = useBudgetFormStore((s) => s.form);

  const initialized = useRef(false);

  const [defaultStartDate, defaultEndDate] = useMemo(() => {
    const rangeKey = getDateRangeKey();
    return rangeKey.split('_');
  }, [getDateRangeKey]);

  useEffect(() => {
    if (!categoryId || initialized.current) return;

    resetForm();
    loadForm(String(categoryId), {
      startDate: storeState.startDate || defaultStartDate,
      endDate: storeState.endDate || defaultEndDate,
      groupBy: 'monthly',
    });

    initialized.current = true;
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
    return <EmptyMessage />;
  }

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <main className='p-component'>
        <BudgetCategoryForm />
      </main>
    </div>
  );
}
