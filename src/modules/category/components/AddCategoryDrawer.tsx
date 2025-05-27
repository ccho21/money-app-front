'use client';

import { useConditionalRender } from '@/modules/shared/hooks/useConditionalRender';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { CategoryForm } from '@/modules/settings/components/category/CategoryForm';
import { useCreateCategory } from '@/modules/category/hooks/queries';
import { useCategoryFormStore } from '../stores/formStore';

interface Props {
  onClose: () => void;
}

export function AddCategoryDrawer({ onClose }: Props) {
  const { getCreateFormData, reset } = useCategoryFormStore();
  const shouldRender = useConditionalRender(true);
  const createCategory = useCreateCategory();

  const handleSubmit = async () => {
    try {
      const data = getCreateFormData();
      await createCategory.mutateAsync(data);
      reset();
      onClose();
    } catch (err) {
      alert('Failed to create category');
    }
  };

  return (
    <Drawer
      open
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
          <input autoFocus className='sr-only' />

          <DrawerHeader>
            <DrawerTitle
              className='text-heading'
              role='heading'
              aria-level={2}
            >
              Add Category
            </DrawerTitle>
          </DrawerHeader>

          <div className='pb-section'>
            <CategoryForm onSubmit={handleSubmit} isEdit={false} />
          </div>
        </DrawerContent>
      )}
    </Drawer>
  );
}
