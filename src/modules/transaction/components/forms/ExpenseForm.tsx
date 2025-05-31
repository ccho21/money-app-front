'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { startOfDay } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';

import { useTransactionFormStore } from '@/modules/transaction/stores/formStore';
import { fetchAccounts } from '@/modules/account/hooks/queries';
import { fetchCategories } from '@/modules/category/hooks/queries';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import DatePicker from '@/components/ui/datePicker';
import Selector from '@/components/ui/custom/Selector';
import { IconName } from '@/modules/shared/lib/iconMap';
import RecurringFormSection from './RecurringFormSection';
import {
  useDeleteTransactionMutation,
  useSubmitTransactionMutation,
} from '../../hooks/queries';

type Props = {
  mode: 'new' | 'edit';
  transactionId?: string;
};

export default function ExpenseForm({ mode, transactionId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useTransactionFormStore((s) => s.state);
  const setField = useTransactionFormStore((s) => s.setField);
  const isDirty = useTransactionFormStore((s) => s.isDirty);

  const { amount, accountId, categoryId, note, description, date } = form;
  const [dirty, setDirty] = useState(false);

  const { data: accounts = [], isLoading: loadingAccounts } = fetchAccounts();
  const { data: categories = [], isLoading: loadingCategories } =
    fetchCategories();

  const selectedAccount = accounts.find((a) => a.id === accountId);
  const selectedCategory = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    setDirty(isDirty());
  }, [amount, accountId, categoryId, note, description, date, isDirty]);

  const { mutate: submitTransaction, isPending } = useSubmitTransactionMutation(
    mode,
    transactionId
  );

  const { mutate: deleteTransaction, isPending: deleting } =
    useDeleteTransactionMutation();

  const handleSubmit = () => {
    submitTransaction(undefined, {
      onSuccess: () => {
        router.push('/transaction/view/list');
      },
      onError: (err) => {
        alert(err instanceof Error ? err.message : '저장 실패');
      },
    });
  };

  const handleDelete = () => {
    if (!transactionId) return;

    deleteTransaction(transactionId, {
      onSuccess: () => {
        router.back();
      },
      onError: (err) => {
        alert(err instanceof Error ? err.message : '삭제 실패');
      },
    });
  };

  if (loadingAccounts || loadingCategories) {
    return (
      <p className='text-label text-muted-foreground text-center py-section'>
        Loading form...
      </p>
    );
  }

  return (
    <div className='space-y-component'>
      {/* Amount */}
      <div className='grid w-full items-center gap-element'>
        <Label htmlFor='Amount' className='text-label'>
          Amount
        </Label>
        <Input
          value={amount}
          onChange={(e) => setField('amount', e.target.value)}
          type='number'
        />
      </div>

      {/* Account */}
      <div className='grid w-full items-center gap-element'>
        <Label htmlFor='Account' className='text-label'>
          Account
        </Label>
        <Selector
          label='Account'
          value={selectedAccount?.name ?? ''}
          onChange={(val) => setField('accountId', val)}
          options={accounts}
          getOptionLabel={(a) => a.name}
          getOptionValue={(a) => a.id}
          getOptionIcon={(a) =>
            a.type === 'CASH'
              ? 'dollarSign'
              : a.type === 'CARD'
              ? 'creditCard'
              : 'piggyBank'
          }
          onEdit={() => router.push('/settings/account')}
        />
      </div>

      {/* Category */}
      <div className='grid w-full items-center gap-element'>
        <Label htmlFor='Category' className='text-label'>
          Category
        </Label>
        <Selector
          label='Category'
          value={selectedCategory?.name ?? ''}
          onChange={(val) => setField('categoryId', val)}
          options={categories.filter((c) => c.type === 'expense')}
          getOptionLabel={(c) => c.name}
          getOptionValue={(c) => c.id}
          getOptionColor={(a) => a.color || '--chart-1'}
          onEdit={() => router.push('/settings/category')}
        />
      </div>

      {/* Date */}
      <div className='grid w-full items-center gap-element'>
        <Label htmlFor='Date' className='text-label'>
          Date
        </Label>
        <DatePicker
          value={startOfDay(new Date(date))}
          onChange={(val: Date) => setField('date', val.toISOString())}
        />
      </div>

      {/* Recurring Section */}
      <RecurringFormSection />

      {/* Note */}
      <div className='grid w-full items-center gap-element'>
        <Label htmlFor='Note' className='text-label'>
          Note
        </Label>
        <Input
          value={note}
          onChange={(e) => setField('note', e.target.value)}
        />
      </div>

      {/* Description */}
      <div className='grid w-full items-center gap-element'>
        <Label htmlFor='Description' className='text-label'>
          Description
        </Label>
        <Textarea
          value={description}
          onChange={(e) => setField('description', e.target.value)}
          rows={1}
        />
      </div>

      {/* Submit Buttons */}
      <div className='pt-component'>
        <div>
          <Button
            size='sm'
            onClick={handleSubmit}
            disabled={!dirty}
            className=' w-full'
          >
            {mode === 'edit' ? 'Update' : 'Save'}
          </Button>
        </div>
        {mode === 'edit' && !dirty && transactionId && (
          <div>
            <Button
              variant='ghost'
              size='sm'
              className='text-destructive w-full'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
