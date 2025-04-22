'use client';

import { useEffect } from 'react';
import { useTransactionFormStore } from '@/modules/transaction/formStore';
import IncomeForm from '../_components/IncomeForm';
import TransferForm from '../_components/TransferForm';
import ExpenseForm from '../_components/ExpenseForm';
import { fetchAccounts } from '@/modules/account/hooks';
import { useSearchParams } from 'next/navigation';
import { parse } from 'date-fns';
import { fetchCategories } from '@/modules/category/hooks';

export default function TransactionNewPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const type = useTransactionFormStore((s) => s.state.type);
  const { init, setField } = useTransactionFormStore((s) => s.actions);

  //
  // Initialize transaction form and fetch required data
  //
  useEffect(() => {
    init();

    if (dateParam) {
      const parsed = parse(dateParam, 'yyyy-MM-dd', new Date()).toISOString();
      setField('date', parsed);
    }

    Promise.all([fetchAccounts(), fetchCategories()]);
  }, [dateParam, init, setField]);

  if (!type) {
    return <p className='text-center text-muted py-10'>Loading...</p>;
  }

  //
  // Render appropriate form based on transaction type
  //
  if (type === 'income') return <IncomeForm mode='new' />;
  if (type === 'transfer') return <TransferForm mode='new' />;
  return <ExpenseForm mode='new' />;
}
