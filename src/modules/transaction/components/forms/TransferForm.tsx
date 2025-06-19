'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Selector from '@/components/ui/form/Selector';
import DatePicker from '@/components/ui/datePicker';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { useTransactionFormStore } from '@/modules/transaction/stores/formStore';
import { useAccounts } from '@/modules/account/hooks/queries';
import RecurringFormSection from './RecurringFormSection';
import {
  useDeleteTransferMutation,
  useSubmitTransferMutation,
} from '../../hooks/queries';
import { ChevronDown } from 'lucide-react';
import UIIcon from '@/components/common/UIIcon';

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
  const [dirty, setDirty] = useState(false);

  const { data: accounts = [], isLoading } = useAccounts();

  const fromAccount = accounts.find((a) => a.id === from);
  const toAccount = accounts.find((a) => a.id === to);

  useEffect(() => {
    setDirty(isDirty());
  }, [amount, from, to, note, description, date, isDirty]);

  const { mutate: submitTransfer } = useSubmitTransferMutation(
    mode,
    transactionId
  );

  const { mutate: deleteTransfer } = useDeleteTransferMutation();

  const handleSubmit = () => {
    submitTransfer(undefined, {
      onSuccess: () => router.push('/transaction/view/list'),
      onError: (err) => {
        alert(err instanceof Error ? err.message : '이체 저장 실패');
      },
    });
  };

  const handleDelete = () => {
    if (!transactionId) return;
    deleteTransfer(transactionId, {
      onSuccess: () => router.push('/transaction/view/list'),
      onError: (err) => {
        alert(err instanceof Error ? err.message : '삭제 실패');
      },
    });
  };

  if (isLoading) {
    return (
      <p className='text-caption text-muted-foreground text-center py-section'>
        Loading accounts...
      </p>
    );
  }

  return (
    <div className='space-y-component'>
      {/* Ammount */}
      <div className='grid gap-element'>
        <Label htmlFor='amount'>Amount</Label>
        <Input
          id='amount'
          value={amount}
          onChange={(e) => setField('amount', e.target.value)}
          type='number'
        />
      </div>

      {/* From Account */}
      <div className='grid gap-element'>
        <Label htmlFor='from-account'>From Account</Label>
        <Selector
          label='From Account'
          value={fromAccount?.id ?? ''}
          onChange={(val) => setField('from', val)}
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
          onEdit={() => router.push('/account')}
        >
          <Button
            type='button'
            variant='outline'
            className='w-full justify-between text-left text-label'
          >
            <div className='flex items-center gap-2 truncate'>
              {fromAccount && (
                <UIIcon
                  name={
                    fromAccount.type === 'CASH'
                      ? 'dollarSign'
                      : fromAccount.type === 'CARD'
                      ? 'creditCard'
                      : 'piggyBank'
                  }
                  className='icon-sm'
                />
              )}
              <span>{fromAccount?.name ?? 'Select account'}</span>
            </div>
            <ChevronDown className='icon-sm text-muted-foreground' />
          </Button>
        </Selector>
      </div>

      {/* To Account */}
      <div className='grid gap-element'>
        <Label htmlFor='to-account'>To Account</Label>
        <Selector
          label='To Account'
          value={toAccount?.id ?? ''}
          onChange={(val) => setField('to', val)}
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
          onEdit={() => router.push('/account')}
        >
          <Button
            type='button'
            variant='outline'
            className='w-full justify-between text-left text-label'
          >
            <div className='flex items-center gap-2 truncate'>
              {toAccount && (
                <UIIcon
                  name={
                    toAccount.type === 'CASH'
                      ? 'dollarSign'
                      : toAccount.type === 'CARD'
                      ? 'creditCard'
                      : 'piggyBank'
                  }
                  className='icon-sm'
                />
              )}
              <span>{toAccount?.name ?? 'Select account'}</span>
            </div>
            <ChevronDown className='icon-sm text-muted-foreground' />
          </Button>
        </Selector>
      </div>

      {/* Date */}
      <div className='grid gap-element'>
        <Label htmlFor='date'>Date</Label>
        <DatePicker
          isoValue={date}
          onChange={(val: Date) => setField('date', val.toISOString())}
        />
      </div>

      {/* Recurring Section */}
      <RecurringFormSection />

      {/* Note */}
      <div className='grid gap-element'>
        <Label htmlFor='note'>Note</Label>
        <Input
          id='note'
          value={note}
          onChange={(e) => setField('note', e.target.value)}
        />
      </div>

      {/* Description */}
      <div className='grid gap-element'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => setField('description', e.target.value)}
          rows={1}
        />
      </div>

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
