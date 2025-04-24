'use client';

import { useEffect } from 'react';
import { useTransactionFormStore } from '@/modules/transaction/formStore';
import { useSearchParams } from 'next/navigation';
import { parse } from 'date-fns';

import IncomeForm from '../_components/IncomeForm';
import ExpenseForm from '../_components/ExpenseForm';
import TransferForm from '../_components/TransferForm';
import { fetchAccounts } from '@/modules/account/hooks';
import { fetchCategories } from '@/modules/category/hooks';

export default function TransactionNewPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const type = useTransactionFormStore((s) => s.state.type);
  const init = useTransactionFormStore((s) => s.init);
  const setField = useTransactionFormStore((s) => s.setField);

  // ✅ 최초 진입 시 init() + 날짜 파라미터 설정
  useEffect(() => {
    init();

    if (dateParam) {
      const parsed = parse(dateParam, 'yyyy-MM-dd', new Date()).toISOString();
      setField('date', parsed);
    }

    (async () => {
      await Promise.all([fetchAccounts(), fetchCategories()]);
    })();
  }, [dateParam, init, setField]);

  // ✅ 로딩 상태 처리
  if (!type) {
    return <p className='text-center text-muted py-10'>Loading...</p>;
  }

  // ✅ 폼 전환 시 완전 리마운트 보장
  return (
    <>
      {type === 'income' && <IncomeForm key='income' mode='new' />}
      {type === 'expense' && <ExpenseForm key='expense' mode='new' />}
      {type === 'transfer' && <TransferForm key='transfer' mode='new' />}
    </>
  );
}
