'use client';

import { useRouter } from 'next/navigation';
import { useBudgetFormStore } from '@/modules/budget/formStore';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { toast } from 'react-hot-toast';

export const BudgetCategoryForm = () => {
  const router = useRouter();
  const amount = useBudgetFormStore((s) => s.form.amount);
  const setField = useBudgetFormStore((s) => s.setField);
  const mode = useBudgetFormStore((s) => s.mode);
  const submitForm = useBudgetFormStore((s) => s.submitForm);
  const resetForm = useBudgetFormStore((s) => s.resetForm);

  const handleSubmit = async () => {
    try {
      await submitForm();
      toast.success(mode === 'edit' ? 'Budget updated.' : 'Budget created.');
      resetForm();
      router.push('/budget/settings');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to save budget.';
      toast.error(message);
    }
  };

  return (
    <div className='space-y-4 bg-surface text-foreground p-4 rounded-md shadow-sm'>
      <Input
        type='number'
        inputMode='numeric'
        placeholder='Enter amount'
        value={amount}
        className='text-center'
        onChange={(e) => setField('amount', Number(e.target.value))}
      />
      <Button className='w-full' onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};
