'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { startOfDay } from 'date-fns';

import { Input } from '@/components_backup/ui/input';
import { Button } from '@/components_backup/ui/button';
import Selector from '@/components_backup/ui/selector/Selector';
import DatePicker from '@/components_backup/ui/date-picker/DatePicker';
import { Textarea } from '@/components_backup/ui/textarea';
import { Label } from '@/components_backup/ui/label';

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
  }, [amount, from, to, note, description, date, isDirty]);

  const handleSubmit = async () => {
    try {
      await submitTransfer(mode, transactionId);
      router.push('');
    } catch (err) {
      alert(err instanceof Error ? err.message : '이체 저장 실패');
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
          placeholder='$ 0'
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='From'>From Account</Label>
        <Selector
          label='From Account'
          value={fromAccount?.name ?? ''}
          onChange={(val) => setField('from', val)}
          options={accounts}
          getOptionLabel={(a) => a.name}
          getOptionValue={(a) => a.id}
          onEdit={() => router.push('/account')}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='To'>To Account</Label>
        <Selector
          label='To Account'
          value={toAccount?.name ?? ''}
          onChange={(val) => setField('to', val)}
          options={accounts}
          getOptionLabel={(a) => a.name}
          getOptionValue={(a) => a.id}
          onEdit={() => router.push('/account')}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='Date'>Date</Label>
        <DatePicker
          value={startOfDay(new Date(date))}
          onChange={(val: Date) => setField('date', val.toISOString())}
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
