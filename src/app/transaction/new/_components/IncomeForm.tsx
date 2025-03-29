// 📄 경로: src/app/transaction/new/_components/IncomeForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccountStore } from '@/stores/useAccountStore';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Selector from '@/components/ui/Selector';
import { Textarea } from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';

export default function IncomeForm() {
  const router = useRouter();
  const {
    amount,
    accountId,
    categoryId,
    note,
    description,
    date,
    setField,
    submitTransaction,
  } = useTransactionFormStore();

  const { accounts = [], fetchAccounts } = useAccountStore();
  const { categories = [], fetchCategories } = useCategoryStore();

  const [localDate, setLocalDate] = useState<Date | null>(
    date ? new Date(date) : new Date()
  );

  useEffect(() => {
    fetchAccounts();
    fetchCategories();
  }, [fetchAccounts, fetchCategories]);

  useEffect(() => {
    if (localDate) {
      const iso = localDate.toISOString().slice(0, 10);
      setField('date', iso);
    }
  }, [localDate, setField]);

  const selectedAccount = accounts.find((a) => a.id === accountId);
  const selectedCategory = categories.find((c) => c.id === categoryId);

  const handleSubmit = async () => {
    if (!amount || !accountId || !categoryId) {
      alert('금액, 계좌, 카테고리를 모두 입력해주세요.');
      return;
    }

    try {
      await submitTransaction();
      router.push('/dashboard');
    } catch (err) {
      alert(
        err instanceof Error ? err.message : '수입 저장 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    <div className='space-y-5'>
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
        options={categories.filter((c) => c.type === 'income')}
        getOptionLabel={(c) => c.name}
        getOptionValue={(c) => c.id}
      />

      <div>
        <label className='text-sm text-gray-500 dark:text-gray-400 mb-1 block'>
          Date
        </label>
        <DatePicker
          label='Date'
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

      <Button color='primary' onClick={handleSubmit} className='w-full'>
        Save Income
      </Button>
    </div>
  );
}
