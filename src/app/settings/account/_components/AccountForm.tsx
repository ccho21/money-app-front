'use client';

import { useAccountFormStore } from '@/modules/account/formStore';
import { AccountType } from '@/modules/account/types';

import Selector from '@/components_backup/ui/selector/Selector';
import { Input } from '@/components_backup/ui/input';
import { Textarea } from '@/components_backup/ui/textarea';
import { Button } from '@/components_backup/ui/button';
import Switch from '@/components_backup/ui/switch/Switch';
import { Label } from '@/components_backup/ui/label';
import { ColorPicker } from '@/components/ui/custom/ColorPicker';

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
    <div className='space-y-component px-component pt-component pb-section'>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='type'>Account Type</Label>
        <Selector
          label='Account Type'
          value={type}
          onChange={(val) => setField('type', val as AccountType)}
          getOptionLabel={(o) => o.label}
          getOptionValue={(o) => o.value}
          options={GROUP_OPTIONS}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='name'>Name</Label>
        <Input
          value={name}
          onChange={(e) => setField('name', e.target.value)}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='balance'>Balance</Label>
        <Input
          type='number'
          value={balance}
          onChange={(e) => setField('balance', Number(e.target.value))}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
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
              onChange={(val) => setField('autoPayment', val)}
            />
          </div>
        </div>
      )}

      <Button onClick={onSubmit} className='w-full mt-component'>
        {submitText}
      </Button>
    </div>
  );
}
