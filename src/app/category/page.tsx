// 📄 src/app/category/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, MinusCircle } from 'lucide-react';
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
    if (confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
    }
  };

  const incomeCategories = categories.filter((c) => c.type === 'income');
  const expenseCategories = categories.filter((c) => c.type === 'expense');

  const renderList = (title: string, items: typeof categories) => (
    <div className='mb-4'>
      <h3 className='text-sm font-semibold text-gray-700 px-3 pb-1'>{title}</h3>
      <ul className='divide-y border-t border-gray-200'>
        {items.map((cat) => (
          <li
            key={cat.id}
            className='flex items-center justify-between px-3 py-2 text-sm'
          >
            <div className='flex items-center gap-2'>
              <button
                className='text-red-500 hover:text-red-600'
                onClick={() => handleDelete(cat.id)}
              >
                <MinusCircle size={16} />
              </button>
              <span className='text-gray-800 truncate max-w-[140px]'>
                {cat.name}
              </span>
            </div>
            <Button
              variant='outline'
              className='text-green-600 px-1 hover:text-green-700 border-none'
              onClick={() => handleEdit(cat.id)}
            >
              <Pencil size={16} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className='pt-3 pb-6'>
      {renderList('Expense Categories', expenseCategories)}
      {renderList('Income Categories', incomeCategories)}
    </div>
  );
}
