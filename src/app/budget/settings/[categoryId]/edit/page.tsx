'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useBudgetFormStore } from '@/modules/budget/formStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { BudgetCategoryForm } from '@/app/budget/_components/BudgetCategoryForm';

export default function EditBudgetCategoryPage() {
  const { categoryId } = useParams();
  const getDateRangeKey = useFilterStore((s) => s.getDateRangeKey);
  const loadForm = useBudgetFormStore((s) => s.loadForm);
  const resetForm = useBudgetFormStore((s) => s.resetForm);

  useEffect(() => {
    if (!categoryId) return;
    const [startDate, endDate] = getDateRangeKey().split('_');
    resetForm();
    loadForm(String(categoryId), { startDate, endDate, groupBy: 'monthly' });
  }, [categoryId, getDateRangeKey, loadForm, resetForm]);

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
