'use client';

import { useEffect } from 'react';
import { useTransactionFormStore } from '@/modules/transaction/formStore';
import { useSearchParams } from 'next/navigation';
import { parse } from 'date-fns';

import IncomeForm from '../_components/IncomeForm';
import ExpenseForm from '../_components/ExpenseForm';
import TransferForm from '../_components/TransferForm';

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

  }, [dateParam, init, setField, type]);

  if (!type) {
    return <p className='text-center text-muted py-10'>Loading...</p>;
  }

  if (type === 'income') return <IncomeForm mode='new' />;
  if (type === 'transfer') return <TransferForm mode='new' />;
  return <ExpenseForm mode='new' />;
}
