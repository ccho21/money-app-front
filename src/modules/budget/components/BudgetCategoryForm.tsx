'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBudgetFormStore } from '../stores/formStore';

interface Props {
  onSubmit: () => void;
  onDelete?: () => void;
  isEdit?: boolean;
}

export function BudgetCategoryForm({
  onSubmit,
  onDelete,
  isEdit = false,
}: Props) {
  const amount = useBudgetFormStore((s) => s.form.amount);
  const setField = useBudgetFormStore((s) => s.setField);

  return (
    <div className='space-y-component px-component pt-component pb-section text-foreground'>
      <Input
        type='number'
        inputMode='numeric'
        placeholder='Amount'
        value={amount}
        onChange={(e) => setField('amount', e.target.value)}
        className='text-center font-semibold'
      />

      <div className='pt-component space-y-element text-center'>
        <Button onClick={onSubmit} className='w-full'>
          {isEdit ? 'Update' : 'Save'}
        </Button>
        {isEdit && (
          <Button
            variant='ghost'
            className='w-full text-destructive'
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
