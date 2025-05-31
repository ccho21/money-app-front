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
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
          reset();
          onClose();
        }
      }}
    >
      {shouldRender && (
        <DrawerContent className='data-[vaul-drawer-direction=bottom]:max-h-[95vh]'>
          <div className='mx-auto w-full max-w-sm overflow-y-auto'>
            <DrawerHeader className='pb-component'>
              <DrawerTitle
                className='text-heading'
                role='heading'
                aria-level={2}
              >
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
            <div className=''>
              <AccountForm
                onSubmit={handleSave}
                submitText='Create'
                isEdit={false}
              />
            </div>
          </div>
        </DrawerContent>
      )}
    </Drawer>
  );
}
