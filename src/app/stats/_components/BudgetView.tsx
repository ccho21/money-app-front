'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Progress } from '@/components/ui/Progress';
import { formatCurrency } from '@/lib/utils';

const mockBudgetData = {
  expense: [
    { categoryName: 'Food', total: 300000, used: 120000, percent: 40 },
    { categoryName: 'Transport', total: 100000, used: 32000, percent: 32 },
  ],
  income: [
    { categoryName: 'Salary', total: 3000000, used: 2400000, percent: 80 },
    { categoryName: 'Freelance', total: 1000000, used: 200000, percent: 20 },
  ],
};

export default function BudgetView() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get('tab') || 'expense') as 'expense' | 'income';

  const budgetList = mockBudgetData[tab];

  const totalUsed = useMemo(() => {
    return budgetList.reduce((sum, b) => sum + b.used, 0);
  }, [budgetList]);

  const totalBudget = useMemo(() => {
    return budgetList.reduce((sum, b) => sum + b.total, 0);
  }, [budgetList]);

  const remaining = totalBudget - totalUsed;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Remaining ({tab === 'expense' ? 'Expense' : 'Income'})
          </p>
          <p className="text-2xl font-semibold dark:text-white">
            {formatCurrency(remaining)}
          </p>
        </div>

        <button
          className="text-xs px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300"
          disabled
        >
          Budget Setting
        </button>
      </div>

      {budgetList.map((budget) => {
        const left = budget.total - budget.used;
        return (
          <div
            key={budget.categoryName}
            className="rounded-lg bg-white dark:bg-zinc-900 p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium dark:text-white">
                {budget.categoryName}
              </p>
              <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-700 dark:text-gray-200">
                {tab === 'expense' ? 'Spent' : 'Received'}
              </span>
            </div>

            <Progress value={budget.percent} />

            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>{formatCurrency(budget.total)}</span>
              <span>{formatCurrency(budget.used)}</span>
              <span>{formatCurrency(left)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
