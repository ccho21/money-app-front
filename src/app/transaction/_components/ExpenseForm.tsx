'use client';

import { useRouter } from 'next/navigation';
import { useAccountStore } from '@/stores/useAccountStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import {
  deleteTransaction,
  submitTransaction,
} from '@/services/transactionService';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Selector from '@/components/ui/Selector';
import { Textarea } from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import { startOfDay } from 'date-fns';
import { useEffect, useState } from 'react';

type Props = {
  mode: 'new' | 'edit';
  id?: string;
};

export default function ExpenseForm({ mode, id }: Props) {
  const router = useRouter();

  const {
    state: { amount, accountId, categoryId, note, description, date },
    actions: { setField, isDirty },
  } = useTransactionFormStore();

  // 계좌 및 카테고리 정보 가져오기
  const {
    state: { accounts = [] },
  } = useAccountStore();
  const {
    state: { categories = [] },
  } = useCategoryStore();

  const selectedAccount = accounts.find((a) => a.id === accountId);
  const selectedCategory = categories.find((c) => c.id === categoryId);

  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDirty(isDirty()); // 폼이 변경되었는지 여부를 실시간으로 감지
  }, [amount, accountId, categoryId, note, description, date, isDirty]);

  const handleSubmit = async () => {
    try {
      await submitTransaction(mode, id);
      router.push('/dashboard/daily');
      router.refresh(); // 페이지 새로고침
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장 실패');
    }
  };

  // 폼을 리셋할 때, 변경된 내용이 있을 경우 확인 경고 추가
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
        options={categories.filter((c) => c.type === 'expense')}
        getOptionLabel={(c) => c.name}
        getOptionValue={(c) => c.id}
        onEdit={() => router.push('/category')}
      />

      <DatePicker
        label='Date'
        value={startOfDay(new Date(date))}
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

      <Button
        onClick={handleSubmit}
        className='w-full mt-6'
        disabled={!dirty} // 폼 변경이 없으면 버튼 비활성화
      >
        {mode === 'edit' ? 'Update' : 'Save'}
      </Button>

      {mode === 'edit' && !dirty && id && (
        <Button onClick={() => handleDelete(id)} className='w-full mt-4'>
          Delete
        </Button>
      )}
    </div>
  );
}
