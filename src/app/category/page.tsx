// src/app/category/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, MinusCircle } from 'lucide-react';

import { useCategoryStore } from '@/modules/category/store';
import { Button } from '@/components/ui/button/Button';
import { deleteCategory, fetchCategories } from '@/modules/category/hooks';

export default function CategoryPage() {
  const { categories } = useCategoryStore();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/category/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    const confirmMsg = 'Are you sure you want to delete this category?';
    if (confirm(confirmMsg)) {
      await deleteCategory(id);
    }
  };

  const incomeCategories = categories.filter((c) => c.type === 'income');
  const expenseCategories = categories.filter((c) => c.type === 'expense');

  const renderList = (title: string, items: typeof categories) => (
    <div className='mb-component'>
      <h3 className='text-caption font-semibold text-muted px-element pb-tight tracking-wide'>
        {title}
      </h3>
      <ul className='divide-y divide-border border-t border-border rounded-default overflow-hidden'>
        {items.map((cat) => (
          <li
            key={cat.id}
            className='flex items-center justify-between p-element bg-surface'
          >
            <div className='flex items-center gap-tight overflow-hidden'>
              <button
                className='text-destructive hover:opacity-80 shrink-0'
                onClick={() => handleDelete(cat.id)}
              >
                <MinusCircle size={16} />
              </button>
              <span className='text-label text-foreground truncate max-w-[160px]'>
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
    <div className='pt-component pb-tabbar min-h-screen bg-surface text-foreground'>
      {renderList('Expense Categories', expenseCategories)}
      {renderList('Income Categories', incomeCategories)}
    </div>
  );
}
