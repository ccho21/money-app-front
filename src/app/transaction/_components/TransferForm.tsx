'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAccountStore } from '@/modules/account/store';
import { useCategoryStore } from '@/modules/category/store';
import { useTransactionFormStore } from '@/modules/transaction/formStore';
import { useUserSettingStore } from '@/stores/useUserSettingStore';

import {
  submitTransaction,
  deleteTransaction,
} from '@/modules/transaction/hooks';

import { Input } from '@/components/ui/check/Input';
import { Button } from '@/components/ui/check/Button';
import Selector from '@/components/ui/check/Selector';
import { Textarea } from '@/components/ui/check/Textarea';
import DatePicker from '@/components/ui/check/DatePicker';
import Divider from '@/components/ui/check/Divider';

import { startOfDay } from 'date-fns';

type Props = {
  mode: 'new' | 'edit';
  id?: string;
};

export default function TransferForm({ mode, id }: Props) {
  const router = useRouter();
  const inputOrder = useUserSettingStore((s) => s.inputOrder);

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
  }, [form, isDirty]);

  const handleSubmit = async () => {
    try {
      await submitTransaction(mode, id);
      router.push('/dashboard/daily');
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장 실패');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      router.back();
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 실패');
    }
  };

  const orderedInputs = useMemo(() => {
    const amountInput = (
      <Input
        key='amount'
        label='Amount'
        value={amount}
        onChange={(e) => setField('amount', e.target.value)}
        type='number'
      />
    );

    const accountSelector = (
      <Selector
        key='account'
        label='Account'
        value={selectedAccount?.name ?? ''}
        onChange={(val) => setField('accountId', val)}
        options={accounts}
        getOptionLabel={(a) => a.name}
        getOptionValue={(a) => a.id}
        onEdit={() => router.push('/account')}
      />
    );

    return inputOrder === 'amount-first'
      ? [amountInput, accountSelector]
      : [accountSelector, amountInput];
  }, [inputOrder, amount, selectedAccount, accounts, setField, router]);

  return (
    <div className='space-y-5 px-4 pt-5 pb-10'>
      <Input
        label='Amount'
        placeholder='$ 0'
        value={amount}
        onChange={(e) => setField('amount', e.target.value)}
        type='number'
      />

      <Selector
        label='From Account'
        value={fromAccount?.name ?? ''}
        onChange={(val) => setField('from', val)}
        options={accounts}
        getOptionLabel={(a) => a.name}
        getOptionValue={(a) => a.id}
        onEdit={() => router.push('/account')}
      />

      <Selector
        label='To Account'
        value={toAccount?.name ?? ''}
        onChange={(val) => setField('to', val)}
        options={accounts}
        getOptionLabel={(a) => a.name}
        getOptionValue={(a) => a.id}
        onEdit={() => router.push('/account')}
      />

      <DatePicker
        label='Date'
        value={startOfDay(new Date(date))}
        onChange={(val) => setField('date', val.toISOString())}
      />

      <Input
        label='Note'
        value={note}
        onChange={(e) => setField('note', e.target.value)}
      />

      <Textarea
        placeholder='Description'
        value={description}
        onChange={(e) => setField('description', e.target.value)}
        rows={1}
      />

      <Button onClick={handleSubmit} className='w-full'>
        {mode === 'edit' ? 'Update' : 'Save'}
      </Button>

      <Divider />

      {mode === 'edit' && !dirty && id && (
        <Button
          color='danger'
          variant='outline'
          onClick={() => handleDelete(id)}
          className='w-full mt-4'
        >
          Delete
        </Button>
      )}
    </div>
  );
}
