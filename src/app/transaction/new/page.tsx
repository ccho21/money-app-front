'use client';

import { useEffect } from 'react';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import IncomeForm from '../_components/IncomeForm';
import TransferForm from '../_components/TransferForm';
import ExpenseForm from '../_components/ExpenseForm';
import { fetchAccounts } from '@/services/accountService';
import { fetchCategories } from '@/services/categoryService';
import { useSearchParams } from 'next/navigation';
import { parse } from 'date-fns';

export default function TransactionNewPage() {
  const dateParam = useSearchParams().get('date');

  const type = useTransactionFormStore((s) => s.state.type);
  const reset = useTransactionFormStore((s) => s.actions.reset);
  const {
    actions: { setField },
  } = useTransactionFormStore();

  useEffect(() => {
    reset();
    if (dateParam) {
      const parsed = parse(dateParam, 'yyyy-MM-dd', new Date()).toISOString();
      setField('date', parsed);
    }
    const run = async () => {
      await fetchAccounts();
      await fetchCategories();
    };
    run();
  }, [setField, reset, dateParam]);

  if (type === 'income') return <IncomeForm mode='new' />;
  if (type === 'transfer') return <TransferForm mode='new' />;
  return <ExpenseForm mode='new' />;
}
