// src/app/category/new/page.tsx
'use client';

import { useCategoryFormStore } from '@/modules/category/formStore';
import { useRouter } from 'next/navigation';
import { CategoryForm } from '../components/CategoryForm';
import { createCategory } from '@/modules/category/hooks';
import { useTopNavPreset } from '@/app/hooks/useTopNavPreset';

export default function AddCategoryPage() {
  const router = useRouter();
  const { getCreateFormData, reset } = useCategoryFormStore();

  useTopNavPreset({
    title: 'Category New',
    onAdd: undefined,
    onBack: () => router.back(),
  });

  const handleSubmit = async () => {
    try {
      const data = getCreateFormData();
      await createCategory(data);
      reset();
      router.push('/settings/category');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create category';
    }
  };

  return (
    <div className='pt-component'>
      <h2 className='text-heading font-semibold px-component pb-tight'>
        Add Category
      </h2>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}
