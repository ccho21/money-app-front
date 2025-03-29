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

export default function ExpenseForm({ mode, id }: Props) {
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
        placeholder='₩ 0'
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
      />

      <Selector
        label='Category'
        value={selectedCategory?.name ?? ''}
        onChange={(val) => setField('categoryId', val)}
        options={categories.filter((c) => c.type === 'expense')}
        getOptionLabel={(c) => c.name}
        getOptionValue={(c) => c.id}
      />

      <div>
        <label className='text-sm text-gray-500 dark:text-gray-400 mb-1 block'>
          Date
        </label>
        <DatePicker
          value={new Date(date)}
          onChange={(val) => setField('date', val.toISOString().slice(0, 10))}
        />
      </div>

      <Input
        label='Note'
        placeholder='간단한 메모 (선택)'
        value={note}
        onChange={(e) => setField('note', e.target.value)}
      />

      <Textarea
        label='Description'
        placeholder='상세 설명 (선택)'
        value={description}
        onChange={(e) => setField('description', e.target.value)}
        rows={3}
      />

      <Button onClick={handleSubmit} className='w-full mt-6'>
        {mode === 'edit' ? 'Update' : 'Save'}
      </Button>
    </div>
  );
}
