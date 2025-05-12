'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, MinusCircle } from 'lucide-react';

import { useCategoryStore } from '@/modules/category/store';
import { deleteCategory, fetchCategories } from '@/modules/category/hooks';

import { Button } from '@/components_backup/ui/button';
import { Card, CardContent } from '@/components_backup/ui/card';

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
    if (confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
    }
  };

  const incomeCategories = categories.filter((c) => c.type === 'income');
  const expenseCategories = categories.filter((c) => c.type === 'expense');

  const renderList = (title: string, items: typeof categories) => (
    <section className='space-y-element px-component'>
      <h3 className='text-sm font-semibold text-muted-foreground tracking-wide'>
        {title}
      </h3>

      {items.map((cat) => (
        <Card key={cat.id} className='py-compact'>
          <CardContent>
            <div className='flex items-center justify-between'>
              {/* Left: delete + name */}
              <div className='flex items-center gap-3 overflow-hidden'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-destructive hover:opacity-80'
                  onClick={() => handleDelete(cat.id)}
                >
                  <MinusCircle size={16} />
                </Button>
                <span className='font-medium text-sm text-foreground truncate max-w-[180px]'>
                  {cat.name}
                </span>
              </div>

              {/* Right: edit */}
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:text-primary'
                onClick={() => handleEdit(cat.id)}
              >
                <Pencil size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );

  return (
    <main className='min-h-screen bg-background text-foreground pt-component pb-tabbar space-y-component'>
      {renderList('Expense Categories', expenseCategories)}
      {renderList('Income Categories', incomeCategories)}
    </main>
  );
}
