'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Selector from '@/components/ui/Selector';
import DatePicker from '@/components/ui/DatePicker';
import { Textarea } from '@/components/ui/Textarea';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import { useAccountStore } from '@/stores/useAccountStore';
import { submitTransferTransaction } from '@/services/transactionService';
import { startOfDay } from 'date-fns';
import { deleteTransaction } from '@/services/transactionService';
import { useEffect, useState } from 'react';
import Divider from '@/components/ui/Divider';

type Props = {
  mode: 'new' | 'edit';
  id?: string;
};

export default function TransferForm({ mode, id }: Props) {
  const router = useRouter();
  const {
    state: { amount, from, to, note, description, date },
    actions: { setField, isDirty },
  } = useTransactionFormStore();

  const {
    state: { accounts = [] },
  } = useAccountStore();

  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDirty(isDirty());
  }, [amount, from, to, note, description, date, isDirty]);

  const fromAccount = accounts.find((a) => a.id === from);
  const toAccount = accounts.find((a) => a.id === to);

  const handleSubmit = async () => {
    try {
      await submitTransferTransaction(mode, id);
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
        value={startOfDay(date)}
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

      <Button onClick={handleSubmit} className='w-full'>
        {mode === 'edit' ? 'Update' : 'Save'}
      </Button>

      <Divider></Divider>

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
