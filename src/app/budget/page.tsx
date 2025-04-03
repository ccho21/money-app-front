'use client';

import { fetchCategories } from '@/services/categoryService';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useEffect } from 'react';
import { CategoryListItem } from '../stats/_components/CategoryListItem';

export default function BudgetPage() {
  const {
    state: { categories },
  } = useCategoryStore();
  useEffect(() => {
    const run = async () => {
      await fetchCategories();
    };
    run();
  }, []);
  return (
    <>
      <div>
        {categories.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            percentage={item.rate}
            amount={item.budget}
            color={item.color}
          ></CategoryListItem>
        ))}
      </div>
    </>
  );
}
