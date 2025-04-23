'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useBudgetFormStore } from '@/modules/budget/formStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { BudgetCategoryForm } from '@/app/budget/_components/BudgetCategoryForm';

export default function NewBudgetCategoryPage() {
  const { categoryId } = useParams();
  const getDateRangeKey = useFilterStore((s) => s.getDateRangeKey);
  const resetForm = useBudgetFormStore((s) => s.resetForm);
  const setField = useBudgetFormStore((s) => s.setField);

  useEffect(() => {
    if (!categoryId) return;

    const [startDate, endDate] = getDateRangeKey().split('_');
    resetForm();
    setField('categoryId', String(categoryId));
    setField('startDate', startDate);
    setField('endDate', endDate);
  }, [categoryId]);

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
