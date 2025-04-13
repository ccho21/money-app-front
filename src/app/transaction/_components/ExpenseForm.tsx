'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAccountStore } from '@/stores/useAccountStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import { useUserSettingStore } from '@/stores/useUserSettingStore';

import {
  submitTransaction,
  deleteTransaction,
} from '@/services/transactionService';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Selector from '@/components/ui/Selector';
import { Textarea } from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import Divider from '@/components/ui/Divider';

import { startOfDay } from 'date-fns';

type Props = {
  mode: 'new' | 'edit';
  id?: string;
};

export default function IncomeForm({ mode, id }: Props) {
  const router = useRouter();
  const inputOrder = useUserSettingStore((s) => s.inputOrder);

  const {
    state: { amount, accountId, categoryId, note, description, date },
    actions: { setField, isDirty },
  } = useTransactionFormStore();

  const {
    state: { accounts = [] },
  } = useAccountStore();

  const {
    state: { categories = [] },
  } = useCategoryStore();

  const selectedAccount = accounts.find((a) => a.id === accountId);
  const selectedCategory = categories.find((c) => c.id === categoryId);

  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDirty(isDirty());
  }, [amount, accountId, categoryId, note, description, date, isDirty]);

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

  return (
    <div className='space-y-5 px-4 pt-5 pb-10'>
      {/* 🔁 inputOrder 적용 */}
      {inputOrder === 'amount-first' ? (
        <>
          <Input
            label='Amount'
            value={amount}
            onChange={(e) => setField('amount', e.target.value)}
            type='number'
          />
          <Selector
            label='Account'
            value={selectedAccount?.name ?? ''}
            onChange={(val) => setField('accountId', val)}
            options={accounts}
            getOptionLabel={(a) => a.name}
            getOptionValue={(a) => a.id}
            onEdit={() => router.push('/account')}
          />
        </>
      ) : (
        <>
          <Selector
            label='Account'
            value={selectedAccount?.name ?? ''}
            onChange={(val) => setField('accountId', val)}
            options={accounts}
            getOptionLabel={(a) => a.name}
            getOptionValue={(a) => a.id}
            onEdit={() => router.push('/account')}
          />
          <Input
            label='Amount'
            value={amount}
            onChange={(e) => setField('amount', e.target.value)}
            type='number'
          />
        </>
      )}

      <Selector
        label='Category'
        value={selectedCategory?.name ?? ''}
        onChange={(val) => setField('categoryId', val)}
        options={categories.filter((c) => c.type === 'income')}
        getOptionLabel={(c) => c.name}
        getOptionValue={(c) => c.id}
        onEdit={() => router.push('/category')}
      />

      <DatePicker
        label='Date'
        value={startOfDay(new Date(date))}
        onChange={(val: Date) => {
          setField('date', val.toISOString());
        }}
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

      <Button onClick={handleSubmit} disabled={!dirty} className='w-full'>
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
