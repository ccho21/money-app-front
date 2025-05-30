'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useEffect } from 'react';
import { useConditionalRender } from '@/modules/shared/hooks/useConditionalRender';
import { BudgetCategoryForm } from './BudgetCategoryForm';
import { useCreateBudgetCategory } from '@/modules/budget/hooks/queries';
import { useBudgetFormStore } from '../stores/formStore';
import { useBudgetStore } from '../stores/store';

interface Props {
  onClose: () => void;
}

export function AddBudgetDrawer({ onClose }: Props) {
  const { selectedBudget } = useBudgetStore();
  const shouldRender = useConditionalRender(!!selectedBudget);

  const setForm = useBudgetFormStore((s) => s.setForm);
  const resetForm = useBudgetFormStore((s) => s.resetForm);
  const setMode = useBudgetFormStore((s) => s.setMode);
  const form = useBudgetFormStore((s) => s.form);

  const createMutation = useCreateBudgetCategory();

  useEffect(() => {
    if (selectedBudget) {
      resetForm();
      setMode('new');
      setForm({
        categoryId: selectedBudget.categoryId,
        amount: 0,
        startDate: selectedBudget.rangeStart,
        endDate: selectedBudget.rangeEnd,
      });
    }
  }, [selectedBudget]);

  const handleSubmit = async () => {
    await createMutation.mutateAsync(form);
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
          <input autoFocus className="sr-only" />
          <DrawerHeader>
            <DrawerTitle className="text-heading" role="heading" aria-level={2}>
              Add Budget
            </DrawerTitle>
          </DrawerHeader>
          <div className="pb-section">
            <BudgetCategoryForm onSubmit={handleSubmit} isEdit={false} />
          </div>
        </DrawerContent>
      )}
    </Drawer>
  );
}
