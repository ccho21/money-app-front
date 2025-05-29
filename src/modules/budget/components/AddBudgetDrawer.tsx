'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useConditionalRender } from '@/modules/shared/hooks/useConditionalRender';
import { useCreateBudgetCategory } from '@/modules/budget/hooks/queries';
import { useBudgetFormStore } from '../formStore';
import { BudgetCategoryForm } from './BudgetCategoryForm';

interface Props {
  onClose: () => void;
}

export function AddBudgetDrawer({ onClose }: Props) {
  const shouldRender = useConditionalRender(true);
  const createBudget = useCreateBudgetCategory();
  const form = useBudgetFormStore((s) => s.form);
  const resetForm = useBudgetFormStore((s) => s.resetForm);

  const handleSubmit = async () => {
    await createBudget.mutateAsync(form);
    resetForm();
    onClose();
  };

  return (
    <Drawer
      open
      onOpenChange={(v) => {
        if (!v) {
          resetForm();
          onClose();
        }
      }}
    >
      {shouldRender && (
        <DrawerContent aria-describedby={undefined}>
          <input autoFocus className='sr-only' />
          <DrawerHeader>
            <DrawerTitle className='text-heading' role='heading' aria-level={2}>
              Add Budget
            </DrawerTitle>
          </DrawerHeader>
          <div className='pb-section'>
            <BudgetCategoryForm onSubmit={handleSubmit} isEdit={false} />
          </div>
        </DrawerContent>
      )}
    </Drawer>
  );
}
