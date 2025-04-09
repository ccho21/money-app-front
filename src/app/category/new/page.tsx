// 📄 src/app/category/new/page.tsx

'use client';

import { createCategory } from '@/services/categoryService';
import { useCategoryFormStore } from '@/stores/useCategoryFormStore';
import { useRouter } from 'next/navigation';
import { CategoryForm } from '../_components/CategoryForm';

export default function AddCategoryPage() {
  const router = useRouter();
  const {
    actions: { getFormData, reset },
  } = useCategoryFormStore();

  const handleSubmit = async () => {
    try {
      const data = getFormData();
      await createCategory(data);
      router.push('/category');
    } catch (err) {
      alert(err instanceof Error ? err.message : '카테고리 생성 중 오류 발생');
    } finally {
      reset();
    }
  };

  return (
    <div className='pt-4'>
      <h2 className='text-md font-semibold px-4 pb-2'>카테고리 추가</h2>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}
