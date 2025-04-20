'use client';

import Selector from '@/components/ui/check/Selector';
import { Button } from '@/components/ui/check/Button';
import { Input } from '@/components/ui/check/Input';
import { Textarea } from '@/components/ui/check/Textarea';
import { useAccountFormStore } from '@/modules/account/formStore';
import { AccountType } from '@/modules/account/types';
// import { Switch } from '@/components/ui/Switch'; // ✅ 자동결제 toggle용

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
    state: { group, name, amount, description, settlementDate, paymentDate },
    actions: { setField },
  } = useAccountFormStore();

  const isCard = group === 'CARD';

  return (
    <div className='min-h-screen  px-4 pt-4 pb-10'>
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

        {/* ✅ 카드 선택 시 추가 필드 렌더링 */}
        {isCard && (
          <div className='space-y-4 border-t pt-4'>
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
          </div>
        )}
      </div>

      <div className=''>
        <Button onClick={onSubmit} className='w-full mt-6'>
          {submitText}
        </Button>
      </div>
    </div>
  );
}
