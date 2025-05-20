'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Selector from '@/components/ui/custom/Selector';
import { Switch } from '@/components/ui/switch';
import { ColorPicker } from '@/components/ui/custom/ColorPicker';
import { useAccountFormStore } from '@/modules/account/formStore';
import { AccountType } from '@/modules/account/types';

const ACCOUNT_TYPE_OPTIONS = [
  { label: 'Cash', value: 'CASH' },
  { label: 'Card', value: 'CARD' },
  { label: 'Bank', value: 'BANK' },
];

interface Props {
  onSubmit: () => void;
  submitText?: string;
}

export default function AccountForm({ onSubmit, submitText = 'Save' }: Props) {
  const {
    type,
    name,
    balance,
    description,
    color,
    settlementDate,
    paymentDate,
    autoPayment,
    setField,
  } = useAccountFormStore();

  const [error, setError] = useState('');

  const isCard = type === 'CARD';

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Account name is required.');
      return;
    }

    if (isNaN(balance)) {
      setError('Balance must be a valid number.');
      return;
    }

    if (isCard) {
      if (settlementDate && (settlementDate < 1 || settlementDate > 31)) {
        setError('Settlement Date must be between 1 and 31.');
        return;
      }

      if (paymentDate && (paymentDate < 1 || paymentDate > 31)) {
        setError('Payment Date must be between 1 and 31.');
        return;
      }
    }

    setError('');
    onSubmit();
  };

  return (
    <div className='space-y-component px-component pt-component pb-section'>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='type'>Account Type</Label>
        <Selector
          label='Account Type'
          options={ACCOUNT_TYPE_OPTIONS}
          value={type}
          getOptionLabel={(o) => o.label}
          getOptionValue={(o) => o.value}
          onChange={(val) => setField('type', val as AccountType)}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          value={name}
          onChange={(e) => setField('name', e.target.value)}
          placeholder='e.g. Main Wallet'
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='balance'>Balance</Label>
        <Input
          id='balance'
          type='number'
          value={balance}
          onChange={(e) => setField('balance', Number(e.target.value))}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          value={description ?? ''}
          onChange={(e) => setField('description', e.target.value)}
          rows={1}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='color'>Color</Label>
        <ColorPicker
          value={color ?? ''}
          onChange={(val) => setField('color', val)}
        />
      </div>

      {isCard && (
        <div className='space-y-component border-t pt-component'>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='settlementDate'>Settlement Date</Label>
            <Input
              id='settlementDate'
              type='number'
              value={settlementDate ?? ''}
              onChange={(e) =>
                setField('settlementDate', Number(e.target.value))
              }
            />
          </div>

          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='paymentDate'>Payment Date</Label>
            <Input
              id='paymentDate'
              type='number'
              value={paymentDate ?? ''}
              onChange={(e) => setField('paymentDate', Number(e.target.value))}
            />
          </div>

          <div className='flex items-center justify-between pt-tight'>
            <Label className='text-label text-muted-foreground'>
              Auto Payment
            </Label>
            <Switch
              checked={autoPayment ?? false}
              onCheckedChange={(val) => setField('autoPayment', val)}
            />
          </div>
        </div>
      )}

      {error && <p className='text-sm text-destructive pt-tight'>{error}</p>}

      <Button onClick={handleSubmit} className='w-full mt-component'>
        {submitText}
      </Button>
    </div>
  );
}
