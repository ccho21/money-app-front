'use client';

import { useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import {
  createBudgetCategory,
  updateBudgetCategory,
} from '@/features/budget/hooks';
import { useRouter } from 'next/navigation';
import { useBudgetCategoryFormStore } from '@/stores/forms/useBudgetCategoryFormStore';

//
// Budget category form for both create and edit
//
export const BudgetCategoryForm = ({
  isEdit = false,
}: {
  isEdit?: boolean;
}) => {
  const router = useRouter();

  const {
    state: { amount },
    actions: {
      syncWithDateFilter,
      getCreateFormData,
      getUpdateFormData,
      reset,
      setField,
    },
  } = useBudgetCategoryFormStore();

  //
  // Sync range from filter on mount
  //
  useEffect(() => {
    syncWithDateFilter();
  }, [syncWithDateFilter]);

  //
  // Handle form submission
  //
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        const { id, data } = getUpdateFormData();
        await updateBudgetCategory(id, data);
        toast.success('Budget updated.');
      } else {
        const data = getCreateFormData();
        await createBudgetCategory(data);
        toast.success('Budget created.');
      }
      reset();
      router.push('/budget/settings');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to save budget.';
      toast.error(message);
    }
  };

  return (
    <div className='space-y-4 bg-surface text-foreground p-4 rounded-md shadow-sm'>
      {/* Budget amount input */}
      <Input
        type='number'
        inputMode='numeric'
        placeholder='Enter amount'
        value={amount}
        className='text-center'
        onChange={(e) => setField('amount', e.target.value)}
      />

      {/* Save button */}
      <Button className='w-full' onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};
