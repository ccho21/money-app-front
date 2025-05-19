// src/app/category/[id]/edit/page.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { fetchCategoryById, updateCategory } from '@/modules/category/hooks';
import { useCategoryFormStore } from '@/modules/category/formStore';
import { CategoryForm } from '@/app/settings/category/components/CategoryForm';
import { useTopNavPreset } from '@/app/hooks/useTopNavPreset';

export default function EditCategoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/')[3];

  const { getUpdateFormData, reset } = useCategoryFormStore();

  useEffect(() => {
    console.log('#', id);
    if (id) fetchCategoryById(id);
  }, [id]);

  useTopNavPreset({
    title: 'Category Edit',
    onAdd: undefined,
    onBack: () => router.back(),
  });

  const handleSubmit = async () => {
    try {
      const data = getUpdateFormData();
      console.log('#### DATA, ', data);
      await updateCategory(id, data);
      reset();
      router.push('/settings/category');
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
