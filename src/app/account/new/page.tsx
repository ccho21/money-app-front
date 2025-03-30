'use client';

import { createAccount } from '@/services/accountService';
import { useRouter } from 'next/navigation';
import AccountForm from '../_components/AccountForm';
import { useAccountFormStore } from '@/stores/useAccountFormStore';

export default function AddAccountPage() {
  const { getFormData, reset } = useAccountFormStore();
  const router = useRouter();

  const handleSave = async () => {
    const payload = getFormData();

    try {
      await createAccount(payload);
      reset();
      router.back();
    } catch (err) {
      alert(err instanceof Error ? err.message : '계좌 생성 실패');
    }
  };

  return <AccountForm onSubmit={handleSave} submitText='Add' />;
}
