'use client';

import { useEffect } from 'react';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import IncomeForm from '../_components/IncomeForm';
import TransferForm from '../_components/TransferForm';
import ExpenseForm from '../_components/ExpenseForm';
import { fetchAccounts } from '@/services/accountService';
import { fetchCategories } from '@/services/categoryService';

export default function TransactionNewPage() {
  const type = useTransactionFormStore((s) => s.state.type);
  const reset = useTransactionFormStore((s) => s.actions.reset);
  const {
    actions: { setField },
  } = useTransactionFormStore();

  useEffect(() => {
    reset();
    const run = async () => {
      await fetchAccounts();
      await fetchCategories();
      setField('date', new Date().toISOString().slice(0, 10));
    };
    run();
  }, [setField, reset]);

  if (type === 'income') return <IncomeForm mode='new' />;
  if (type === 'transfer') return <TransferForm mode='new' />;
  return <ExpenseForm mode='new' />;
}
