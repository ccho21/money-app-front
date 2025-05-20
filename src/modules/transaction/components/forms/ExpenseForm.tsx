'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAccountStore } from '@/modules/account/store';
import { useCategoryStore } from '@/modules/category/store';
import { useTransactionFormStore } from '@/modules/transaction/formStore';
// import { useUserSettingStore } from '@/stores/useUserSettingStore';

import {
  submitTransaction,
  deleteTransaction,
} from '@/modules/transaction/hooks';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import DatePicker from '@/components/ui/datePicker';
import Selector from '@/components/ui/custom/Selector';

import { startOfDay } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import { IconName } from '@/lib/iconMap';

type Props = {
  mode: 'new' | 'edit';
  transactionId?: string;
};

export default function ExpenseForm({ mode, transactionId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  // const inputOrder = useUserSettingStore((s) => s.inputOrder);

  const form = useTransactionFormStore((s) => s.state);
  const setField = useTransactionFormStore((s) => s.setField);
  const isDirty = useTransactionFormStore((s) => s.isDirty);

  const { amount, accountId, categoryId, note, description, date } = form;

  const { accounts = [] } = useAccountStore();
  const { categories = [] } = useCategoryStore();

  const selectedAccount = accounts.find((a) => a.id === accountId);
  const selectedCategory = categories.find((c) => c.id === categoryId);

  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDirty(isDirty());
  }, [amount, accountId, categoryId, note, description, date, isDirty]);

  const handleSubmit = async () => {
    try {
      await submitTransaction(mode, transactionId);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'dashboard',
      });

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'transaction-groups',
      });
      router.push('/transaction/view/list');
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장 실패');
    }
  };

  const handleDelete = async () => {
    try {
      if (!transactionId) return;
      await deleteTransaction(transactionId);
      router.back();
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 실패');
    }
  };

  return (
    <div className='space-y-component px-component pt-component pb-section'>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='Amount'>Amount</Label>
        <Input
          value={amount}
          onChange={(e) => setField('amount', e.target.value)}
          type='number'
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='Account'>Account</Label>
        <Selector
          label='Account'
          value={selectedAccount?.name ?? ''}
          onChange={(val) => setField('accountId', val)}
          options={accounts}
          getOptionLabel={(a) => a.name}
          getOptionValue={(a) => a.id}
          getOptionColor={(a) => a.color || '--chart-10'}
          onEdit={() => router.push('/settings/account/new')}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='Category'>Category</Label>
        <Selector
          label='Category'
          value={selectedCategory?.name ?? ''}
          onChange={(val) => setField('categoryId', val)}
          options={categories.filter((c) => c.type === 'expense')}
          getOptionLabel={(c) => c.name}
          getOptionValue={(c) => c.id}
          getOptionColor={(a) => a.color || '#e5e7eb'}
          getOptionIcon={(item) => (item.icon || 'icon') as IconName}
          onEdit={() => router.push('/settings/category/new')}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='Date'>Date</Label>
        <DatePicker
          value={startOfDay(new Date(date))}
          onChange={(val: Date) => {
            setField('date', val.toISOString());
          }}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='Note'>Note</Label>
        <Input
          value={note}
          onChange={(e) => setField('note', e.target.value)}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='Description'>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setField('description', e.target.value)}
          rows={1}
        />
      </div>

      <div className='text-right'>
        {mode === 'edit' && !dirty && transactionId && (
          <Button
            variant='destructive'
            onClick={handleDelete}
            className='mr-component'
          >
            Delete
          </Button>
        )}
        <Button onClick={handleSubmit} disabled={!dirty}>
          {mode === 'edit' ? 'Update' : 'Save'}
        </Button>
      </div>
    </div>
  );
}
