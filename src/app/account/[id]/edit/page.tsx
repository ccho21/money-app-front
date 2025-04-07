'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchAccountById } from '@/services/accountService';
import { updateAccount } from '@/services/accountService';
import { useAccountFormStore } from '@/stores/useAccountFormStore';
import AccountForm from '../../_components/AccountForm';
import { useAccountStore } from '@/stores/useAccountStore';

export default function AccountEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const {
    actions: { setAllFields, getFormData, reset },
  } = useAccountFormStore();

  useEffect(() => {
    const run = async () => {
      if (!id) return;

      const acc =
        useAccountStore.getState().state.selectedAccount ??
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
    try {
      const payload = getFormData();
      await updateAccount(id as string, payload);
      reset();
      router.back();
    } catch (err) {
      alert(err instanceof Error ? err.message : '계좌 수정 실패');
    }
  };

  return <AccountForm onSubmit={handleUpdate} submitText='Update' />;
}
