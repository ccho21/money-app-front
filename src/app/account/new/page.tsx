'use client';

import { createAccount } from '@/modules/account/hooks';
import { useRouter } from 'next/navigation';
import AccountForm from '../_components/AccountForm';
import { useAccountFormStore } from '@/modules/account/formStore';
import { useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { AccountCreateRequestDTO } from '@/modules/account/types';

export default function NewAccountPage() {
  const {
    actions: { getCreateFormData, reset },
  } = useAccountFormStore();

  const router = useRouter();

  //
  // Configure top navigation on mount
  //
  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Account New.',
      onBack: () => {
        router.back();
      },
    });

    return () => {
      //
      // Reset top navigation on unmount
      //
      useUIStore.getState().resetTopNav();
    };
  }, [router]);

  //
  // Handle form submission
  //
  const handleSave = async () => {
    const payload: AccountCreateRequestDTO = getCreateFormData();

    try {
      await createAccount(payload);
      reset();
      router.back();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create account');
    }
  };

  return <AccountForm onSubmit={handleSave} submitText='Add' />;
}
