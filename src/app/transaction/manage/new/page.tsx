'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { parse } from 'date-fns';

import { useTransactionFormStore } from '@/modules/transaction/stores/formStore';

import ExpenseForm from '@/modules/transaction/components/forms/ExpenseForm';
import TransferForm from '@/modules/transaction/components/forms/TransferForm';
import IncomeForm from '@/modules/transaction/components/forms/IncomeForm';
import LoadingMessage from '@/components/ui/message/loadingMessage';

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
  }, [dateParam, init, setField]);

  if (!type) {
    return <LoadingMessage />;
  }

  return (
    <div className=''>
      {type === 'income' && <IncomeForm key='income' mode='new' />}
      {type === 'expense' && <ExpenseForm key='expense' mode='new' />}
      {type === 'transfer' && <TransferForm key='transfer' mode='new' />}
    </div>
  );
}
