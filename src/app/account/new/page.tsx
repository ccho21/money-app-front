'use client';

import { createAccount } from '@/modules/account/hooks';
import { useRouter } from 'next/navigation';
import AccountForm from '../_components/AccountForm';
import { useAccountFormStore } from '@/modules/account/formStore';
import { useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';

export default function NewAccountPage() {
  const { getCreateFormData, reset } = useAccountFormStore();
  const router = useRouter();

  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Account New.',
      onBack: () => router.back(),
    });

    return () => {
      useUIStore.getState().resetTopNav();
    };
  }, [router]);

  const handleSave = async () => {
    try {
      const payload = getCreateFormData();
      await createAccount(payload);
      reset();
      router.back();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create account');
    }
  };

  return <AccountForm onSubmit={handleSave} submitText='Add' />;
}
