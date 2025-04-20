'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchAccountById, updateAccount } from '@/modules/account/hooks';
import { useAccountFormStore } from '@/modules/account/formStore';
import AccountForm from '../../_components/AccountForm';
import { useAccountStore } from '@/modules/account/store';
import { useUIStore } from '@/stores/useUIStore';
import { AccountUpdateRequestDTO } from '@/modules/account/types';

//
// Edit account page
//
export default function AccountEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    actions: { setAllFields, getupdateFormData, reset },
  } = useAccountFormStore();

  //
  // Set up top navigation when component mounts
  //
  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Account Edit.',
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
  // Load account details if not cached
  //
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
          settlementDate: acc.settlementDate ?? null,
          paymentDate: acc.paymentDate ?? null,
        });
      } else {
        alert('Unable to load the account.');
        router.push('/account');
      }
    };

    run();
  }, [id, setAllFields, router]);

  //
  // Submit updated form data
  //
  const handleUpdate = async () => {
    try {
      const payload: AccountUpdateRequestDTO = getupdateFormData();
      await updateAccount(id as string, payload);
      reset();
      router.back();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update account');
    }
  };

  return <AccountForm onSubmit={handleUpdate} submitText='Update' />;
}
