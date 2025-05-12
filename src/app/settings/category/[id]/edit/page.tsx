// src/app/category/[id]/edit/page.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { fillCategoryForm, updateCategory } from '@/modules/category/hooks';
import { useCategoryFormStore } from '@/modules/category/formStore';
import { CategoryForm } from '@/app/settings/category/components/CategoryForm';

export default function EditCategoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/')[2];

  const { getUpdateFormData, reset } = useCategoryFormStore();

  useEffect(() => {
    if (id) fillCategoryForm(id);
  }, [id]);

  const handleSubmit = async () => {
    try {
      const data = getUpdateFormData();
      await updateCategory(id, data);
      reset();
      router.push('/category');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update category';
    }
  };

  return (
    <div className='pt-component'>
      <h2 className='text-heading font-semibold px-component pb-tight'>
        Edit Category
      </h2>
      <CategoryForm onSubmit={handleSubmit} isEdit />
    </div>
  );
}
