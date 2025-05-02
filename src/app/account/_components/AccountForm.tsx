// src/app/account/_components/AccountForm.tsx

'use client';

import Selector from '@/components/ui/selector/Selector';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { useAccountFormStore } from '@/modules/account/formStore';
import { AccountType } from '@/modules/account/types';
import Switch from '@/components/ui/switch/Switch';

const GROUP_OPTIONS = [
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

  const isCard = type === 'CARD';

  return (
    <div className='min-h-screen px-component pt-component pb-tabbar'>
      <div className='space-y-component'>
        <Selector
          label='Account Type'
          value={type}
          onChange={(val) => setField('type', val as AccountType)}
          getOptionLabel={(o) => o.label}
          getOptionValue={(o) => o.value}
          options={GROUP_OPTIONS}
        />

        <Input
          label='Name'
          value={name}
          onChange={(e) => setField('name', e.target.value)}
        />

        <Input
          label='Balance'
          type='number'
          value={balance}
          onChange={(e) => setField('balance', Number(e.target.value))}
        />

        <Textarea
          value={description ?? ''}
          onChange={(e) => setField('description', e.target.value)}
          placeholder='Description'
          rows={1}
        />

        <Input
          label='Color'
          type='text'
          value={color ?? ''}
          onChange={(e) => setField('color', e.target.value)}
        />

        {isCard && (
          <div className='space-y-component border-t pt-component'>
            <Input
              label='Settlement Date'
              type='number'
              value={settlementDate ?? ''}
              onChange={(e) =>
                setField('settlementDate', Number(e.target.value))
              }
            />

            <Input
              label='Payment Date'
              type='number'
              value={paymentDate ?? ''}
              onChange={(e) => setField('paymentDate', Number(e.target.value))}
            />

            <div className='flex items-center justify-between'>
              <span className='text-label text-muted'>Auto Payment</span>
              <Switch
                checked={autoPayment ?? false}
                onChange={(val) => setField('autoPayment', val)}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <Button onClick={onSubmit} className='w-full mt-component'>
          {submitText}
        </Button>
      </div>
    </div>
  );
}
