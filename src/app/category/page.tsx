// 📄 src/app/category/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { deleteCategory, fetchCategories } from '@/services/categoryService';
import { Button } from '@/components/ui/Button';

export default function CategoryPage() {
  const {
    state: { categories },
  } = useCategoryStore();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/category/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      await deleteCategory(id);
    }
  };

  const incomeCategories = categories.filter((c) => c.type === 'income');
  const expenseCategories = categories.filter((c) => c.type === 'expense');

  const renderList = (title: string, items: typeof categories) => (
    <div className='mb-6'>
      <h3 className='text-lg font-bold px-4 pb-2'>{title}</h3>
      <ul className='divide-y border-t'>
        {items.map((cat) => (
          <li
            key={cat.id}
            className='flex items-center justify-between px-4 py-3'
          >
            <div className='flex items-center gap-2'>
              <span>{cat.name}</span>
            </div>
            <div className='flex gap-2'>
              <Button
                variant={'outline'}
                className='border-none text-green-600'
                onClick={() => handleEdit(cat.id)}
              >
                <Pencil size={18} />
              </Button>
              <Button
                variant={'outline'}
                className='border-none text-red-500'
                onClick={() => handleDelete(cat.id)}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className='pt-4'>
      {renderList('지출 카테고리', expenseCategories)}
      {renderList('수입 카테고리', incomeCategories)}
    </div>
  );
}
