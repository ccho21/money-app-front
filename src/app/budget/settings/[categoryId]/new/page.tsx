'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useBudgetCategoryFormStore } from '@/modules/budget/formStore';
import { BudgetCategoryForm } from '@/app/budget/_components/BudgetCategoryForm';

//
// Page for creating a new budget category
//
export default function NewBudgetCategoryPage() {
  const { categoryId } = useParams();

  const { reset, syncWithDateFilter, setField } = useBudgetCategoryFormStore(
    (s) => s.actions
  );

  //
  // Initialize form state on mount
  //
  useEffect(() => {
    if (!categoryId) return;
    reset();
    syncWithDateFilter();
    setField('categoryId', String(categoryId));
  }, [categoryId, reset, syncWithDateFilter, setField]);

  //
  // Handle missing category ID
  //
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
