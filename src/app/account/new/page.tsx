'use client';

import { createAccount } from '@/services/accountService';
import { useRouter } from 'next/navigation';
import AccountForm from '../_components/AccountForm';
import { useAccountFormStore } from '@/stores/useAccountFormStore';
import { useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';

export default function AddAccountPage() {
  const {
    actions: { getFormData, reset },
  } = useAccountFormStore();
  const router = useRouter();

  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Account New.',
      onBack: () => {
        router.back();
      },
    });

    return () => {
      useUIStore.getState().resetTopNav(); // 💡 페이지 나가면 초기화
    };
  }, [router]);

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
