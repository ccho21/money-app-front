'use client';

import { useState, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { fetchCategories } from '@/modules/category/hooks/queries';
import { Card, CardContent } from '@/components/ui/card';
import { TypographySmall } from '@/components/ui/typography';
import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';
import UIIcon from '@/components/ui/UIIcon';
import { IconName } from '@/modules/shared/lib/iconMap';
import { EditCategoryDrawer } from '@/modules/category/components/EditCategoryDrawer';
import { AddCategoryDrawer } from '@/modules/category/components/AddCategoryDrawer';

export default function CategoryPage() {
  const router = useRouter();
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data: categories = [] } = fetchCategories();

  useTopNavPreset({
    title: 'Category',
    onAdd: () => setIsAddOpen(true),
    onBack: () => router.back(),
  });

  const incomeCategories = useMemo(
    () => categories.filter((c) => c.type === 'income'),
    [categories]
  );

  const expenseCategories = useMemo(
    () => categories.filter((c) => c.type === 'expense'),
    [categories]
  );

  const renderList = (title: string, items: typeof categories) => (
    <section className="space-y-3 px-4">
      <TypographySmall>{title}</TypographySmall>
      {items.map((cat) => (
        <Card
          key={cat.id}
          className="rounded-md p-0 shadow-xs border-none hover:shadow-sm transition"
          onClick={() => setEditingCategoryId(cat.id)}
        >
          <CardContent className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="rounded-full p-2"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cat.color} 10%, transparent)`,
                }}
              >
                <UIIcon
                  name={cat.icon as IconName}
                  style={{ color: cat.color }}
                  size={12}
                />
              </div>
              <span className="text-sm text-foreground truncate max-w-[180px]">
                {cat.name}
              </span>
            </div>
            <ChevronRight size={16} />
          </CardContent>
        </Card>
      ))}
    </section>
  );

  return (
    <main className="min-h-screen pt-6 pb-[80px] space-y-3 rounded-t-2xl">
      <div className="space-y-2 px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold">List</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Tap to edit. Long press to reorder.
        </p>
      </div>

      {renderList('Expense Categories', expenseCategories)}
      {renderList('Income Categories', incomeCategories)}

      {isAddOpen && <AddCategoryDrawer onClose={() => setIsAddOpen(false)} />}
      {editingCategoryId && (
        <EditCategoryDrawer
          categoryId={editingCategoryId}
          onClose={() => setEditingCategoryId(null)}
        />
      )}
    </main>
  );
}
