'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useEffect } from 'react';
import { useConditionalRender } from '@/modules/shared/hooks/conditionalRender';
import { BudgetCategoryForm } from './BudgetCategoryForm';
import { useUpdateBudgetCategory } from '@/modules/budget/hooks/queries';
import { useBudgetFormStore } from '../stores/formStore';
import { useBudgetStore } from '../stores/store';

interface Props {
  onClose: () => void;
}

export function EditBudgetDrawer({ onClose }: Props) {
  const { selectedBudget } = useBudgetStore();
  const categoryId = selectedBudget?.categoryId ?? '';
  const shouldRender = useConditionalRender(!!selectedBudget);

  const setForm = useBudgetFormStore((s) => s.setForm);
  const resetForm = useBudgetFormStore((s) => s.resetForm);
  const setMode = useBudgetFormStore((s) => s.setMode);
  const form = useBudgetFormStore((s) => s.form);

  useEffect(() => {
    if (selectedBudget) {
      setMode('edit');
      resetForm();
      setForm({
        categoryId: selectedBudget.categoryId,
        amount: String(selectedBudget.amount),
        startDate: selectedBudget.rangeStart,
        endDate: selectedBudget.rangeEnd,
      });
    }
  }, [resetForm, selectedBudget, setForm, setMode]);

  const updateMutation = useUpdateBudgetCategory();

  const handleSubmit = async () => {
    if (!categoryId) return;
    await updateMutation.mutateAsync({
      id: categoryId,
      data: { ...form, amount: Number(form.amount) },
    });

    resetForm();
    onClose();
  };

  return (
    <Drawer
      open={!!selectedBudget}
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
