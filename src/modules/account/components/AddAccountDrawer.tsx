'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { useAccountFormStore } from '@/modules/account/store/formStore';
import AccountForm from '@/modules/account/components/AccountForm';
import { useConditionalRender } from '@/modules/shared/hooks/useConditionalRender';
import { useCreateAccount } from '@/modules/account/hooks/queries';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AddAccountDrawer({ open, onClose }: Props) {
  const shouldRender = useConditionalRender(open, 200);
  const { getCreateFormData, reset } = useAccountFormStore();
  const createAccount = useCreateAccount();

  const handleSave = () => {
    const data = getCreateFormData();
    createAccount.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
      onError: (error) => {
        console.error('Account creation failed:', error);
      },
    });
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
      <DrawerContent
        aria-labelledby='add-account-title'
        aria-describedby='add-account-description'
      >
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader className='pb-component'>
            <DrawerTitle id='add-account-title' className='text-heading'>
              Add Account
            </DrawerTitle>
            <DrawerDescription
              id='add-account-description'
              className='text-caption text-muted-foreground'
            >
              Create a new account for your cash, card, or bank.
            </DrawerDescription>
          </DrawerHeader>

          {/* Focus anchor for accessibility */}
          <div className='sr-only'>
            <input autoFocus tabIndex={-1} />
          </div>

          {/* ✅ only AccountForm is conditionally rendered */}
          <div className='pb-section'>
            {shouldRender && (
              <AccountForm
                onSubmit={handleSave}
                submitText='Create'
                isEdit={false}
              />
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
