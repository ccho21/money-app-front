'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchAccounts, fetchAccountById } from '@/services/accountService';
import { updateAccount } from '@/services/accountService';
import { useAccountFormStore } from '@/stores/useAccountFormStore';
import AccountForm from '../../_components/AccountForm';
import { useAccountStore } from '@/stores/useAccountStore';

export default function AccountEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { setAllFields, getFormData, reset } = useAccountFormStore();

  useEffect(() => {
    console.log('### IDIDID', id);
    const run = async () => {
      if (!id) return;

      await fetchAccounts();
      const acc =
        useAccountStore.getState().selectedAccount ??
        (await fetchAccountById(id.toString()));

      if (acc) {
        setAllFields({
          name: acc.name,
          amount: String(acc.balance),
          description: acc.description ?? '',
          group: acc.type,
        });
      } else {
        alert('해당 계좌를 불러올 수 없습니다.');
        router.push('/account');
      }
    };
    run();
  }, [id, setAllFields, router]);

  const handleUpdate = async () => {
    console.log('### handle update');
    try {
      const payload = getFormData();
      console.log('!!! payload', payload);
      await updateAccount(id as string, payload);
      reset();
      router.back();
    } catch (err) {
      alert(err instanceof Error ? err.message : '계좌 수정 실패');
    }
  };

  return <AccountForm onSubmit={handleUpdate} submitText='Update' />;
}
