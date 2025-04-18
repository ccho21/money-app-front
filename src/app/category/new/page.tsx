'use client';

import { createCategory } from '@/features/category/hooks';
import { useCategoryFormStore } from '@/stores/forms/useCategoryFormStore';
import { useRouter } from 'next/navigation';
import { CategoryForm } from '../_components/CategoryForm';

//
// Category creation page
//
export default function AddCategoryPage() {
  const router = useRouter();
  const {
    actions: { getCreateFormData, reset },
  } = useCategoryFormStore();

  //
  // Handle category creation
  //
  const handleSubmit = async () => {
    try {
      const data = getCreateFormData();
      await createCategory(data);
      reset();
      router.push('/category');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create category';
      alert(message);
    }
  };

  return (
    <div className="pt-4">
      <h2 className="text-md font-semibold px-4 pb-2">Add Category</h2>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}
