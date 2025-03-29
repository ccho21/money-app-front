'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { getTransactionById } from '@/features/transaction/api';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import { useAccountStore } from '@/stores/useAccountStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import IncomeForm from '../../_components/IncomeForm';
import TransferForm from '../../_components/TransferForm';
import ExpenseForm from '../../_components/ExpenseForm';

export default function TransactionEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { fetchAccounts } = useAccountStore();
  const { fetchCategories } = useCategoryStore();
  const { type, setAllFields } = useTransactionFormStore();

  useEffect(() => {
    fetchAccounts();
    fetchCategories();

    if (id) {
      (async () => {
        try {
          const data = await getTransactionById(id as string);
          setAllFields(data);
        } catch (err) {
          alert(
            err instanceof Error
              ? err.message
              : '거래 정보를 불러오지 못했습니다.'
          );
          router.back();
        }
      })();
    }
  }, [id, fetchAccounts, fetchCategories, setAllFields, router]);

  if (!type) return null;

  if (type === 'income') return <IncomeForm mode='edit' id={id as string} />;
  if (type === 'transfer')
    return <TransferForm mode='edit' id={id as string} />;
  return <ExpenseForm mode='edit' id={id as string} />;
}
