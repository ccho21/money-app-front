// 📄 src/app/category/[id]/edit/page.tsx

'use client';

import { fillCategoryForm, updateCategory } from '@/services/categoryService';
import { useCategoryFormStore } from '@/stores/useCategoryFormStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CategoryForm } from '../../_components/CategoryForm';

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const router = useRouter();
  const {
    actions: { getFormData, reset },
  } = useCategoryFormStore();

  useEffect(() => {
    if (params.id) {
      fillCategoryForm(params.id);
    }
  }, [params.id]);

  const handleSubmit = async () => {
    try {
      const data = getFormData();
      await updateCategory(params.id, data);
      router.push('/category');
    } catch (err) {
      alert(err instanceof Error ? err.message : '카테고리 수정 중 오류 발생');
    } finally {
      reset();
    }
  };

  return (
    <div className='pt-4'>
      <h2 className='text-xl font-semibold px-4 pb-2'>카테고리 수정</h2>
      <CategoryForm onSubmit={handleSubmit} isEdit />
    </div>
  );
}
