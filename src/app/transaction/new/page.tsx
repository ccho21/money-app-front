'use client';

import { useEffect } from 'react';
import { useTransactionFormStore } from '@/stores/forms/useTransactionFormStore';
import IncomeForm from '../_components/IncomeForm';
import TransferForm from '../_components/TransferForm';
import ExpenseForm from '../_components/ExpenseForm';
import { fetchAccounts } from '@/features/account/hooks';
import { fetchCategories } from '@/features/category/hooks';
import { useSearchParams } from 'next/navigation';
import { parse } from 'date-fns';

export default function TransactionNewPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const type = useTransactionFormStore((s) => s.state.type);
  const { init, setField } = useTransactionFormStore((s) => s.actions);

  useEffect(() => {
    // ✅ 상태 초기화
    init();

    // ✅ 날짜 파라미터 적용
    if (dateParam) {
      const parsed = parse(dateParam, 'yyyy-MM-dd', new Date()).toISOString();
      setField('date', parsed);
    }

    // ✅ 병렬 fetch
    Promise.all([fetchAccounts(), fetchCategories()]);
  }, [dateParam, init, setField]);

  // ✅ 초기 상태 처리
  if (!type) return <p className='text-center text-muted py-10'>Loading...</p>;

  if (type === 'income') return <IncomeForm mode='new' />;
  if (type === 'transfer') return <TransferForm mode='new' />;
  return <ExpenseForm mode='new' />;
}
