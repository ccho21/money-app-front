'use client';

import { useEffect } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useAccountFormStore } from '@/modules/account/store/formStore';
import { useConditionalRender } from '@/modules/shared/hooks/useConditionalRender';
import {
  fetchAccountById,
  useUpdateAccount,
  useDeleteAccount,
} from '../hooks/queries';
import AccountForm from './AccountForm';

interface Props {
  open: boolean;
  accountId: string | null;
  onClose: () => void;
}

export function EditAccountDrawer({ open, accountId, onClose }: Props) {
  const { setAllFields, getUpdateFormData, reset } = useAccountFormStore();
  const shouldRender = useConditionalRender(open);

  const { data } = fetchAccountById(accountId ?? '', !!accountId);
  const updateAccount = useUpdateAccount();
  const deleteAccount = useDeleteAccount();

  useEffect(() => {
    if (data) {
      setAllFields({
        name: data.name,
        type: data.type,
        balance: data.balance,
        description: data.description ?? '',
        color: data.color ?? '',
        settlementDate: data.settlementDate ?? undefined,
        paymentDate: data.paymentDate ?? undefined,
        autoPayment: data.autoPayment ?? false,
      });
    }
  }, [data, setAllFields]);

  const handleUpdate = async () => {
    const payload = getUpdateFormData();
    if (!accountId) return;
    await updateAccount.mutateAsync({ id: accountId, data: payload });
    reset();
    onClose();
  };

  const handleDelete = async () => {
    if (!accountId) return;
    await deleteAccount.mutateAsync(accountId);
    reset();
    onClose();
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
          reset();
          onClose();
        }
      }}
    >
      {shouldRender && (
        <DrawerContent aria-describedby={undefined}>
          {/* 포커스 anchor for accessibility */}
          <input autoFocus className='sr-only' />

          <DrawerHeader className=''>
            <DrawerTitle className='text-heading' role='heading' aria-level={2}>
              Edit Account
            </DrawerTitle>
          </DrawerHeader>

          <div className='pb-section'>
            <AccountForm
              onSubmit={handleUpdate}
              onDelete={handleDelete}
              isEdit
              submitText='Update'
            />
          </div>
        </DrawerContent>
      )}
    </Drawer>
  );
}
