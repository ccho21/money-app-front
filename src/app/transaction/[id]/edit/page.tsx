'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useTransactionFormStore } from '@/modules/transaction/formStore';
import { useTransactionStore } from '@/modules/transaction/store';

import IncomeForm from '../../_components/IncomeForm';
import TransferForm from '../../_components/TransferForm';
import ExpenseForm from '../../_components/ExpenseForm';

import { fetchAccounts } from '@/modules/account/hooks';
import { fetchTransactionById } from '@/modules/transaction/hooks';
import { fetchCategories } from '@/modules/category/hooks';

export default function TransactionEditPage() {
  const { id: transactionId } = useParams();
  const router = useRouter();

  const type = useTransactionFormStore((s) => s.state.type);
  const init = useTransactionFormStore((s) => s.init);

  useEffect(() => {
    const run = async () => {
      if (!transactionId) return;

      try {
        // 📦 Load accounts + categories
        await Promise.all([fetchAccounts(), fetchCategories()]);

        // 🧠 Use cache if already selected
        const cached = useTransactionStore.getState().selectedTransaction;
        const tx =
          cached && cached.id === transactionId
            ? cached
            : await fetchTransactionById(String(transactionId));

        if (!tx) throw new Error();

        // 📝 Map response → preset
        const preset = {
          type: tx.type as 'income' | 'expense' | 'transfer',
          amount: String(tx.amount),
          date: tx.date,
          note: tx.note ?? '',
          description: tx.description ?? '',
          accountId: tx.accountId || '',
          categoryId: tx.category?.id || '',
          from: tx.accountId || '',
          to: tx.toAccountId ?? '',
        };

        init(preset);
      } catch (err) {
        alert('Failed to load transaction. ' + err);
        router.push('/dashboard/daily');
      }
    };

    run();
  }, [transactionId, init, router]);

  // ⏳ Loading
  if (!type) {
    return (
      <div className='text-center text-muted py-10'>Loading transaction...</div>
    );
  }

  // 🧾 Render form
  if (type === 'income') return <IncomeForm mode='edit' transactionId={String(transactionId)} />;
  if (type === 'transfer')
    return <TransferForm mode='edit' transactionId={String(transactionId)} />;
  return <ExpenseForm mode='edit' transactionId={String(transactionId)} />;
}
