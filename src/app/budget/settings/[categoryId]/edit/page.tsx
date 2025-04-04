// 📄 경로: src/app/budget/settings/edit/page.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { getDateRangeKey } from '@/lib/date.util';
import { DateFilterParams } from '@/features/shared/types';
import { fetchBudgetCategoriesByCategoryId } from '../../_components/budgetService';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useBudgetStore } from '../../_components/useBudgetStore';
import { useBudgetCategoryFormStore } from '../../_components/useBudgetCategoryFormStore';

export default function EditBudgetPage() {
  const { categoryId } = useParams();
  const {
    state: { date, range },
  } = useDateFilterStore();

  const {
    state: { budgetCategoryGroupResponse },
  } = useBudgetStore();
  const { setField, reset } = useBudgetCategoryFormStore((s) => s.actions);

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: range, amount: 0 }),
    [date, range]
  );

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!categoryId) return;
      const [startDate, endDate] = dateRangeKey.split('_');
      const filter: DateFilterParams = {
        startDate,
        endDate,
        groupBy: range,
      };
      await fetchBudgetCategoriesByCategoryId(String(categoryId), filter);
      reset();
      setSelectedKey(null);
    };

    run();
  }, [categoryId, dateRangeKey, range, reset]);

  const budgets = budgetCategoryGroupResponse?.budgets ?? [];

  console.log('### BUDGETS', budgets);
  console.log('### BUDGETS', budgetCategoryGroupResponse);

  const handleSelect = (item: (typeof budgets)[0]) => {
    setSelectedKey(`${item.startDate}_${item.endDate}`);
    setField('categoryId', String(categoryId));
    setField('amount', item.budgetAmount.toString());
    setField('startDate', item.startDate);
    setField('endDate', item.endDate);
    setField('groupBy', range);
  };

  if (!categoryId) return <div className='p-4'>잘못된 접근입니다</div>;

  return (
    <div className='min-h-screen bg-white dark:bg-black text-black dark:text-white'>
      <main className='p-4 space-y-4'>
        {/* 안내 메시지 */}
        <div className='rounded-md bg-gray-100 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-300'>
          You can set the budget settings for each month. If you change the
          default budget, it will be applied starting next month.
        </div>

        {/* 예산 리스트 */}
        <div className='space-y-2'>
          {budgets.map((b) => {
            const key = `${b.startDate}_${b.endDate}`;
            return (
              <button
                key={key}
                onClick={() => handleSelect(b)}
                className={cn(
                  'w-full flex justify-between items-center rounded-lg border px-4 py-3',
                  selectedKey === key
                    ? 'border-red-500 text-red-500'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                <span>{b.label}</span>
                <span>${b.budgetAmount.toFixed(2)}</span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
