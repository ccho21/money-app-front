// src/app/transaction/chart/category/page.tsx
'use client';

import { CategoryPieChart } from '../../components/chart/CategoryPieChart';
import { TopCategoryBarChart } from '../../components/chart/TopCategoryBarChart';

export default function TransactionChartCategoryPage() {
  return (
    <main className='w-full px-component pb-[10vh] space-y-component'>
      <CategoryPieChart />
      <TopCategoryBarChart />
    </main>
  );
}
