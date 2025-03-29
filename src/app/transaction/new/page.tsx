'use client';

import { useEffect } from 'react';
import { useAccountStore } from '@/stores/useAccountStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import IncomeForm from '../_components/IncomeForm';
import TransferForm from '../_components/TransferForm';
import ExpenseForm from '../_components/ExpenseForm';

export default function TransactionNewPage() {
  const type = useTransactionFormStore((s) => s.type);
  const { fetchAccounts } = useAccountStore();
  const { fetchCategories } = useCategoryStore();
  const { setField } = useTransactionFormStore();

  useEffect(() => {
    fetchAccounts();
    fetchCategories();
    setField('date', new Date().toISOString().slice(0, 10));
  }, [fetchAccounts, fetchCategories, setField]);

  if (type === 'income') return <IncomeForm mode='new' />;
  if (type === 'transfer') return <TransferForm mode='new' />;
  return <ExpenseForm mode='new' />;
}
