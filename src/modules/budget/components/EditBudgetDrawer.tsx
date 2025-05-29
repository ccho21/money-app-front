'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useConditionalRender } from '@/modules/shared/hooks/useConditionalRender';
import { useUpdateBudgetCategory } from '@/modules/budget/hooks/queries';
import { useBudgetFormStore } from '../formStore';
import { BudgetCategoryForm } from './BudgetCategoryForm';

interface Props {
  categoryId: string;
  onClose: () => void;
}

export function EditBudgetDrawer({ categoryId, onClose }: Props) {
  const shouldRender = useConditionalRender(!!categoryId);
  const form = useBudgetFormStore((s) => s.form);
  const resetForm = useBudgetFormStore((s) => s.resetForm);
  const updateBudget = useUpdateBudgetCategory();

  const handleSubmit = async () => {
    const { amount, startDate, endDate, type } = form;
    await updateBudget.mutateAsync({
      id: categoryId,
      data: { amount, startDate, endDate, type },
    });
    resetForm();
    onClose();
  };

  return (
    <Drawer
      open={!!categoryId}
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
              Edit Budget
            </DrawerTitle>
          </DrawerHeader>
          <div className='pb-section'>
            <BudgetCategoryForm onSubmit={handleSubmit} isEdit />
          </div>
        </DrawerContent>
      )}
    </Drawer>
  );
}
