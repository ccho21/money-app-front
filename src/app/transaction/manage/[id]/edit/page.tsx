'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useTransactionFormStore } from '@/modules/transaction/stores/formStore';
import { useTransactionByIdQuery } from '@/modules/transaction/hooks/queries';

import IncomeForm from '@/modules/transaction/components/forms/IncomeForm';
import TransferForm from '@/modules/transaction/components/forms/TransferForm';
import ExpenseForm from '@/modules/transaction/components/forms/ExpenseForm';

export default function TransactionEditPage() {
  const { id: transactionId } = useParams();
  const router = useRouter();
  const init = useTransactionFormStore((s) => s.init);
  const type = useTransactionFormStore((s) => s.state.type);

  const { data: tx, isLoading, isError } = useTransactionByIdQuery(String(transactionId));

  useEffect(() => {
    if (!tx) return;

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
  }, [tx, init]);

  if (isLoading) {
    return (
      <div className="text-center text-muted text-label py-section">
        Loading transaction...
      </div>
    );
  }

  if (isError || !type) {
    router.push('/transaction/view/list');
    return null;
  }

  const tid = String(transactionId);

  return (
    <div className='p-component pb-section'>
      {type === 'income' && <IncomeForm key='income' mode="edit" transactionId={tid} />}
      {type === 'expense' && <ExpenseForm key='expense' mode="edit" transactionId={tid} />}
      {type === 'transfer' && <TransferForm key='transfer' mode="edit" transactionId={tid} />}
    </div>
  );
}
