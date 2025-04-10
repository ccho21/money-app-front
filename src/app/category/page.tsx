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
    <div className='mb-6'>
      <h3 className='text-xs font-semibold text-muted px-3 pb-2 tracking-wide'>
        {title}
      </h3>
      <ul className='divide-y divide-border border-t border-border'>
        {items.map((cat) => (
          <li
            key={cat.id}
            className='flex items-center justify-between px-3 py-2 bg-surface'
          >
            <div className='flex items-center gap-2 overflow-hidden'>
              <button
                className='text-destructive hover:opacity-80 shrink-0'
                onClick={() => handleDelete(cat.id)}
              >
                <MinusCircle size={16} />
              </button>
              <span className='text-sm text-foreground truncate max-w-[160px]'>
                {cat.name}
              </span>
            </div>

            <Button
              variant='outline'
              color='gray'
              className='px-1 hover:text-primary'
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
    <div className='pt-4 pb-[10vh] min-h-screen bg-surface'>
      {renderList('Expense Categories', expenseCategories)}
      {renderList('Income Categories', incomeCategories)}
    </div>
  );
}
