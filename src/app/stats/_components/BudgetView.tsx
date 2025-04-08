'use client';

import { useEffect } from 'react';
import { useStatsStore } from '@/stores/useStatsStore';
import { fetchStatsByBudget } from '@/services/statsService';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { getDateRangeKey } from '@/lib/date.util';
import { CategoryListItem } from './CategoryListItem';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { CategoryType } from '@/features/category/types';
import EmptyMessage from '@/components/ui/EmptyMessage';
import Panel from '@/components/ui/Panel';

export default function BudgetView() {
  const router = useRouter();
  const {
    state: { date, range, transactionType },
  } = useDateFilterStore();

  const {
    state: { budgetResponse, isLoading },
  } = useStatsStore();

  useEffect(() => {
    const run = async () => {
      const [startDate, endDate] = getDateRangeKey(date, {
        unit: range,
        amount: 0,
      }).split('_');
      await fetchStatsByBudget({
        startDate,
        endDate,
        type: transactionType as CategoryType,
      });
    };

    run();
  }, [date, transactionType, range]);

  const handleClick = (id: string) => {
    router.push(`/stats/budget/${id}`);
  };
  if (isLoading) return <p className='p-4'>Loading...</p>;

  if (!budgetResponse) {
    return <EmptyMessage />;
  }

  return (
    <>
      <Panel className='p-3 mb-1'>
        <div className='grid grid-cols-12 items-center'>
          {/* 왼쪽: Remaining 정보 */}
          <div className='col-span-6'>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              Remaining ({transactionType === 'expense' ? 'Expense' : 'Income'})
            </p>
            <p className='text-base font-semibold text-gray-900 dark:text-white mt-0.5'>
              {budgetResponse.totalRemaining.toLocaleString()}원
            </p>
          </div>

          {/* 오른쪽: 버튼 */}
          <div className='col-span-6 flex justify-end'>
            <Button
              className='text-xs px-2 py-1 h-auto rounded-sm border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300'
              variant='outline'
              onClick={() => router.push('/budget/settings')}
            >
              Budget Setting
            </Button>
          </div>
        </div>
      </Panel>
      <Panel>
        {budgetResponse.data.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            percentage={item.rate}
            amount={item.budget}
            color={item.color}
            onClick={() => handleClick(item.categoryId)}
            variant='with-progress-a'
          />
        ))}
      </Panel>
    </>
  );
}
