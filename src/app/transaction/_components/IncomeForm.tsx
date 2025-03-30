'use client';

import { useRouter } from 'next/navigation';
import { useAccountStore } from '@/stores/useAccountStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import { submitTransaction } from '@/services/transactionService';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Selector from '@/components/ui/Selector';
import { Textarea } from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';

type Props = {
  mode: 'new' | 'edit';
  id?: string;
};

export default function IncomeForm({ mode, id }: Props) {
  const router = useRouter();
  const { amount, accountId, categoryId, note, description, date, setField } =
    useTransactionFormStore();

  const { accounts = [] } = useAccountStore();
  const { categories = [] } = useCategoryStore();

  const selectedAccount = accounts.find((a) => a.id === accountId);
  const selectedCategory = categories.find((c) => c.id === categoryId);

  const handleSubmit = async () => {
    try {
      await submitTransaction(mode, id);
      router.push('/dashboard/daily');
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장 실패');
    }
  };

  return (
    <div className='space-y-5 px-4 pt-5 pb-10'>
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
        value={new Date(date)}
        onChange={(val) => setField('date', val.toISOString().slice(0, 10))}
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

      <Button onClick={handleSubmit} className='w-full mt-6'>
        {mode === 'edit' ? 'Update' : 'Save'}
      </Button>
    </div>
  );
}
