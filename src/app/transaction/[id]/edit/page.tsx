'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useTransactionFormStore } from '@/stores/forms/useTransactionFormStore';
import { useTransactionStore } from '@/stores/useTransactionStore';

import IncomeForm from '../../_components/IncomeForm';
import TransferForm from '../../_components/TransferForm';
import ExpenseForm from '../../_components/ExpenseForm';

import { fetchAccounts } from '@/features/account/hooks';
import { fetchCategories } from '@/features/category/hooks';
import { fetchTransactionById } from '@/features/transaction/hooks';

//
// Edit transaction page
//
export default function TransactionEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    state: { type },
    actions: { init },
  } = useTransactionFormStore();

  //
  // Fetch and initialize transaction data for editing
  //
  useEffect(() => {
    const run = async () => {
      if (!id) return;

      try {
        //
        // Fetch required related data (accounts, categories)
        //
        await Promise.all([fetchAccounts(), fetchCategories()]);

        const cached = useTransactionStore.getState().selectedTransaction;
        const tx =
          cached && cached.id === id
            ? cached
            : await fetchTransactionById(id.toString());

        if (!tx) throw new Error();

        //
        // Prepare preset fields to populate form
        //
        const preset = {
          type: tx.type,
          amount: String(tx.amount),
          date: tx.date,
          note: tx.note ?? '',
          description: tx.description ?? '',
          accountId: tx.accountId || '',
          categoryId: tx.categoryId || '',
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
  }, [id, init, router]);

  //
  // Show loading until type is set
  //
  if (!type) {
    return (
      <div className='text-center text-muted py-10'>Loading transaction...</div>
    );
  }

  //
  // Render form based on transaction type
  //
  if (type === 'income') return <IncomeForm mode='edit' id={id as string} />;
  if (type === 'transfer')
    return <TransferForm mode='edit' id={id as string} />;
  return <ExpenseForm mode='edit' id={id as string} />;
}
