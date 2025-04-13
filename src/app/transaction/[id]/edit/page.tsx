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

export default function TransactionEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    state: { type },
    actions: { init },
  } = useTransactionFormStore();

  useEffect(() => {
    const run = async () => {
      if (!id) return;

      try {
        await Promise.all([fetchAccounts(), fetchCategories()]);

        const cachedTx = useTransactionStore.getState().selectedTransaction;
        const tx =
          cachedTx && cachedTx.id === id
            ? cachedTx
            : await fetchTransactionById(id.toString());

        if (!tx) throw new Error();

        const preset = {
          type: tx.type,
          amount: String(tx.amount),
          date: tx.date,
          note: tx.note ?? '',
          description: tx.description ?? '',
          accountId: tx.account?.id || '',
          categoryId: tx.category?.id || '',
          from: tx.accountId || '',
          to: tx.toAccountId ?? '',
        };

        // ✅ 초기 상태 및 모드 설정
        init(preset);
      } catch (err) {
        alert('해당 거래를 불러올 수 없습니다.' + err);
        router.push('/dashboard/daily');
      }
    };

    run();
  }, [id, init, router]);

  // ✅ 로딩 상태
  if (!type) {
    return (
      <div className='text-center text-muted py-10'>Loading transaction...</div>
    );
  }

  // ✅ 트랜잭션 타입별 렌더링
  if (type === 'income') return <IncomeForm mode='edit' id={id as string} />;
  if (type === 'transfer')
    return <TransferForm mode='edit' id={id as string} />;
  return <ExpenseForm mode='edit' id={id as string} />;
}
