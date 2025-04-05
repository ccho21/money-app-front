'use client';

import Selector from '@/components/ui/Selector';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useAccountFormStore } from '@/stores/useAccountFormStore';
import { AccountType } from '@/app/account-dashboard/_components/account/types';

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
    state: { group, name, amount, description },
    actions: { setField },
  } = useAccountFormStore();

  return (
    <div className='min-h-screen bg-white px-4 pt-4 pb-10'>
      <div className='space-y-4'>
        <Selector
          label='Group'
          value={group}
          onChange={(val) => setField('group', val as AccountType)}
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
          label='Amount'
          type='number'
          value={amount}
          onChange={(e) => setField('amount', e.target.value)}
        />

        <Textarea
          value={description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder='Description'
          rows={1}
        />
      </div>

      <div className=''>
        <Button onClick={onSubmit} className='w-full mt-6'>
          {submitText}
        </Button>
      </div>
    </div>
  );
}
