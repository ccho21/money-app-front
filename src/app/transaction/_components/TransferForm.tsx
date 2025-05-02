// src/app/transaction/_components/TransferForm.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { startOfDay } from 'date-fns';
import { Button } from '@/components/ui/button/Button';
import Divider from '@/components/ui/divider/Divider';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { Input } from '@/components/ui/input/Input';
import DatePicker from '@/components/ui/date-picker/DatePicker';
import Selector from '@/components/ui/selector/Selector';
import { deleteTransaction, submitTransfer } from '@/modules/transaction/hooks';
import { useAccountStore } from '@/modules/account/store';
import { useTransactionFormStore } from '@/modules/transaction/formStore';

type Props = {
  mode: 'new' | 'edit';
  transactionId?: string;
};

export default function TransferForm({ mode, transactionId }: Props) {
  const router = useRouter();

  const form = useTransactionFormStore((s) => s.state);
  const setField = useTransactionFormStore((s) => s.setField);
  const isDirty = useTransactionFormStore((s) => s.isDirty);

  const { amount, from, to, note, description, date } = form;

  const accounts = useAccountStore((s) => s.accounts) || [];

  const fromAccount = accounts.find((a) => a.id === from);
  const toAccount = accounts.find((a) => a.id === to);

  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDirty(isDirty());
  }, [form, isDirty]);

  const handleSubmit = async () => {
    try {
      await submitTransfer(mode, transactionId);
      router.push('/dashboard/daily');
    } catch (err) {
      alert(err instanceof Error ? err.message : '이체 저장 실패');
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
    <div className='space-y-component px-component pt-component pb-section'>
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
        onChange={(val: Date) => setField('date', val.toISOString())}
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

      {mode === 'edit' && !dirty && transactionId && (
        <Button
          color='danger'
          variant='outline'
          onClick={() => handleDelete(transactionId)}
          className='w-full mt-component'
        >
          Delete
        </Button>
      )}
    </div>
  );
}
