import React, { useEffect, useMemo } from 'react';
import useBudgetStore from '@/features/budget/store';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Progress } from '@/components/ui/Progress';
import { formatCurrency } from '@/lib/utils';

export default function BudgetBox() {
  const { budgets, loading, error, fetchBudgetsAction } = useBudgetStore();

  useEffect(() => {
    fetchBudgetsAction();
  }, [fetchBudgetsAction]);

  const totalBudget = useMemo(
    () => budgets.reduce((acc, b) => acc + b.total, 0),
    [budgets]
  );

  const used = 32.48; // 이건 임시 값 (차후 Transaction 합산으로 대체)
  const remaining = totalBudget - used;
  const percentUsed = totalBudget > 0 ? (used / totalBudget) * 100 : 0;

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className='text-red-500 dark:text-red-400'>{error}</div>;

  return (
    <div className='bg-white dark:bg-[#121212] rounded-xl p-4 shadow-sm mt-4'>
      <h2 className='text-lg font-semibold mb-3 dark:text-white'>💳 Budget</h2>

      <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-1'>
        <span>Total Budget</span>
        <span className='font-medium text-black dark:text-white'>
          {formatCurrency(totalBudget)}
        </span>
      </div>

      <div className='relative w-full mt-2 mb-3'>
        <Progress value={percentUsed} />
        <div className='absolute right-0 -top-5 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-700 dark:text-gray-200'>
          Today
        </div>
      </div>

      <div className='flex justify-between text-sm mt-1 text-gray-600 dark:text-gray-300'>
        <div className='text-blue-600 font-medium'>{formatCurrency(used)}</div>
        <div className='text-gray-500 dark:text-gray-400'>
          {percentUsed.toFixed(0)}%
        </div>
        <div className='text-gray-800 dark:text-gray-100'>
          {formatCurrency(remaining)}
        </div>
      </div>
    </div>
  );
}
