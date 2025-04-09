'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { fillCategoryForm, updateCategory } from '@/services/categoryService';
import { useCategoryFormStore } from '@/stores/useCategoryFormStore';
import { CategoryForm } from '../../_components/CategoryForm';

// ✅ Next가 자동으로 주입하는 구조: props는 항상 async function처럼 다뤄야 함
export default function EditCategoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    actions: { getFormData, reset },
  } = useCategoryFormStore();

  // 경로에서 id 추출 (e.g. /category/abc123/edit → abc123)
  const id = pathname.split('/')[2];

  useEffect(() => {
    fillCategoryForm(id);
  }, [id]);

  const handleSubmit = async () => {
    try {
      const data = getFormData();
      await updateCategory(id, data);
      router.push('/category');
    } catch (err) {
      alert(err instanceof Error ? err.message : '카테고리 수정 중 오류 발생');
    } finally {
      reset();
    }
  };

  return (
    <div className='pt-4'>
      <h2 className='text-md font-semibold px-4 pb-2'>카테고리 수정</h2>
      <CategoryForm onSubmit={handleSubmit} isEdit />
    </div>
  );
}
