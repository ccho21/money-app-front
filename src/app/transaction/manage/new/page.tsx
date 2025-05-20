// src/app/transaction/new
'use client';

import { useEffect } from 'react';
import { useTransactionFormStore } from '@/modules/transaction/formStore';
import { useSearchParams } from 'next/navigation';
import { parse } from 'date-fns';

import { fetchAccounts } from '@/modules/account/hooks';
import { fetchCategories } from '@/modules/category/hooks';
import ExpenseForm from '@/modules/transaction/components/forms/ExpenseForm';
import TransferForm from '@/modules/transaction/components/forms/TransferForm';
import IncomeForm from '@/modules/transaction/components/forms/IncomeForm';

export default function TransactionNewPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const type = useTransactionFormStore((s) => s.state.type);
  const init = useTransactionFormStore((s) => s.init);
  const setField = useTransactionFormStore((s) => s.setField);

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

  if (!type) {
    return (
      <p className='text-label text-muted text-center py-section'>Loading...</p>
    );
  }

  return (
    <>
      {type === 'income' && <IncomeForm key='income' mode='new' />}
      {type === 'expense' && <ExpenseForm key='expense' mode='new' />}
      {type === 'transfer' && <TransferForm key='transfer' mode='new' />}
    </>
  );
}
