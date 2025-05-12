// src/app/transaction/chart/budget/page.tsx
'use client';

import { InsightCard } from '../../components/chart/InsightCard';
import { BudgetSummaryDonut } from '../../components/chart/BudgetSummaryDonut';
import { BudgetUsageStackedBarChart } from '../../components/chart/BudgetUsageStackedBarChart';

export default function TransactionChartBudgetPage() {
  return (
    <main className='w-full px-component pb-[10vh] space-y-component'>
      <BudgetSummaryDonut />
      <InsightCard text='2 categories are over budget' />

      <BudgetUsageStackedBarChart />
    </main>
  );
}
