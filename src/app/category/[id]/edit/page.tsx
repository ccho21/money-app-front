'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { fillCategoryForm, updateCategory } from '@/features/category/hooks';
import { useCategoryFormStore } from '@/modules/category/formStore';
import { CategoryForm } from '../../_components/CategoryForm';

//
// Edit category page
//
export default function EditCategoryPage() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    actions: { getUpdateFormData, reset },
  } = useCategoryFormStore();

  //
  // Extract ID from pathname (/category/:id/edit)
  //
  const id = pathname.split('/')[2];

  //
  // Load category data into form on mount
  //
  useEffect(() => {
    fillCategoryForm(id);
  }, [id]);

  //
  // Submit category update
  //
  const handleSubmit = async () => {
    try {
      const data = getUpdateFormData();
      await updateCategory(id, data);
      reset();
      router.push('/category');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update category';
      alert(message);
    }
  };

  return (
    <div className='pt-4'>
      <h2 className='text-md font-semibold px-4 pb-2'>Edit Category</h2>
      <CategoryForm onSubmit={handleSubmit} isEdit />
    </div>
  );
}
