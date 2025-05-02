'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useBudgetFormStore } from '@/modules/budget/formStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { BudgetCategoryForm } from '@/app/budget/components/BudgetCategoryForm';
import EmptyMessage from '@/components/ui/empty/EmptyMessage';

export default function NewBudgetCategoryPage() {
  const { categoryId } = useParams();
  const getDateRangeKey = useFilterStore((s) => s.getDateRangeKey);
  const resetForm = useBudgetFormStore((s) => s.resetForm);
  const setField = useBudgetFormStore((s) => s.setField);
  const storeState = useBudgetFormStore((s) => s.form);

  useEffect(() => {
    if (!categoryId) return;

    const [defaultStartDate, defaultEndDate] = getDateRangeKey().split('_');

    resetForm();
    setField('categoryId', String(categoryId));
    setField('startDate', storeState.startDate || defaultStartDate);
    setField('endDate', storeState.endDate || defaultEndDate);
  }, [
    categoryId,
    getDateRangeKey,
    resetForm,
    setField,
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
