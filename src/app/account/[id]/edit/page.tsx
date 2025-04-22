'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchAccountById, updateAccount } from '@/modules/account/hooks';
import { useAccountFormStore } from '@/modules/account/formStore';
import AccountForm from '../../_components/AccountForm';
import { useAccountStore } from '@/modules/account/store';
import { useUIStore } from '@/stores/useUIStore';

export default function AccountEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const { setAllFields, getUpdateFormData, reset } = useAccountFormStore();

  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Account Edit.',
      onBack: () => router.back(),
    });

    return () => {
      useUIStore.getState().resetTopNav();
    };
  }, [router]);

  useEffect(() => {
    const run = async () => {
      if (!id) return;

      const acc =
        useAccountStore.getState().selectedAccount ??
        (await fetchAccountById(id.toString()));

      if (acc) {
        setAllFields({
          name: acc.name,
          type: acc.type,
          balance: acc.balance,
          description: acc.description ?? '',
          color: acc.color ?? '',
          settlementDate: acc.settlementDate ?? undefined,
          paymentDate: acc.paymentDate ?? undefined,
          autoPayment: acc.autoPayment ?? false,
        });
      } else {
        alert('Unable to load the account.');
        router.push('/account');
      }
    };

    run();
  }, [id, setAllFields, router]);

  const handleUpdate = async () => {
    try {
      const payload = getUpdateFormData();
      await updateAccount(id as string, payload);
      reset();
      router.back();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update account');
    }
  };

  return <AccountForm onSubmit={handleUpdate} submitText='Update' />;
}
