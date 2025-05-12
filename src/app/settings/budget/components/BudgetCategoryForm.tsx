'use client';

import { useRouter } from 'next/navigation';
import { useBudgetFormStore } from '@/modules/budget/formStore';

import { Input } from '@/components_backup/ui/input';
import { Button } from '@/components_backup/ui/button';

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
      resetForm();
      router.push('/budget/settings');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to save budget.';
      console.error(message);
    }
  };

  return (
    <div className="space-y-component bg-surface text-foreground p-component rounded-card shadow-sm">
      <div className="text-label text-muted-foreground text-center font-semibold">
        {mode === 'edit' ? 'Edit Budget' : 'Set Budget Amount'}
      </div>

      <Input
        type="number"
        inputMode="numeric"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setField('amount', Number(e.target.value))}
        className="text-center font-bold text-body"
      />

      <Button onClick={handleSubmit} className="w-full">
        Save
      </Button>
    </div>
  );
};
