'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BudgetCategoryForm } from '../../_components/BudgetCategoryForm';
import { useBudgetCategoryFormStore } from '../../_components/useBudgetCategoryFormStore';

export default function NewBudgetCategoryPage() {
  const { categoryId } = useParams();

  const { reset, syncWithDateFilter, setField } = useBudgetCategoryFormStore(
    (s) => s.actions
  );

  useEffect(() => {
    if (!categoryId) return;
    reset();
    syncWithDateFilter();
    setField('categoryId', String(categoryId));
  }, [categoryId, reset, syncWithDateFilter, setField]);

  if (!categoryId) {
    return (
      <div className='p-4 text-sm text-error bg-surface text-center'>
        카테고리 ID가 없습니다
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
