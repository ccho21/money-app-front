// src/app/account/[id]/edit/page.tsx
'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchAccountById, updateAccount } from '@/modules/account/hooks';
import { useAccountFormStore } from '@/modules/account/formStore';
import AccountForm from '../../_components/AccountForm';
import { useAccountStore } from '@/modules/account/store';
import { useUIStore } from '@/stores/useUIStore';
import { toast } from 'react-hot-toast';

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
    const loadAccount = async () => {
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
        toast.error('Unable to load the account.');
        router.push('/account');
      }
    };

    loadAccount();
  }, [id, setAllFields, router]);

  const handleUpdate = async () => {
    try {
      const payload = getUpdateFormData();
      await updateAccount(id as string, payload);
      reset();
      router.back();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to update account'
      );
    }
  };

  return <AccountForm onSubmit={handleUpdate} submitText="Update" />;
}
