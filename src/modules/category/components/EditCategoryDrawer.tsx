'use client';

import { useEffect } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { CategoryForm } from '@/modules/category/components/CategoryForm';
import { useConditionalRender } from '@/modules/shared/hooks/conditionalRender';
import {
  useCategoryById,
  useUpdateCategory,
  useDeleteCategory,
} from '@/modules/category/hooks/queries';
import { useCategoryFormStore } from '../stores/formStore';

interface Props {
  categoryId: string;
  onClose: () => void;
}

export function EditCategoryDrawer({ categoryId, onClose }: Props) {
  const shouldRender = useConditionalRender(!!categoryId);

  const { setAllFields, getUpdateFormData, reset } = useCategoryFormStore();

  const { data } = useCategoryById(categoryId, !!categoryId);
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  useEffect(() => {
    if (data) {
      setAllFields({
        name: data.name,
        type: data.type,
        icon: data.icon ?? '',
        color: data.color ?? '',
      });
    }
  }, [data, setAllFields]);

  const handleSubmit = async () => {
    const payload = getUpdateFormData();
    await updateCategory.mutateAsync({ id: categoryId, data: payload });
    reset();
    onClose();
  };

  const handleDelete = async () => {
    await deleteCategory.mutateAsync(categoryId);
    reset();
    onClose();
  };

  return (
    <Drawer
      open={!!categoryId}
      onOpenChange={(v) => {
        if (!v) {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          reset();
          onClose();
        }
      }}
    >
      {shouldRender && (
        <DrawerContent className='' aria-describedby={undefined}>
          {/* 포커스 안전 */}
          <input autoFocus className='sr-only' />

          <DrawerHeader className=''>
            <DrawerTitle className='text-heading' role='heading' aria-level={2}>
              Edit Category
            </DrawerTitle>
          </DrawerHeader>

          <div className='pb-section'>
            <CategoryForm
              onSubmit={handleSubmit}
              onDelete={handleDelete}
              isEdit
            />
          </div>
        </DrawerContent>
      )}
    </Drawer>
  );
}
