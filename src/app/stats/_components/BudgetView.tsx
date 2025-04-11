'use client';

import { Button } from '@/components/ui/Button';
import { CategoryListItem } from './CategoryListItem';
import Panel from '@/components/ui/Panel';
import { useRouter } from 'next/navigation';
import type { CategoryType } from '@/features/category/types';
import { StatsByBudget } from '@/features/stats/types';

interface BudgetViewProps {
  transactionType: CategoryType;
  totalRemaining: number;
  data: StatsByBudget[];
}

export default function BudgetView({
  transactionType,
  totalRemaining,
  data,
}: BudgetViewProps) {
  const router = useRouter();

  return (
    <>
      <Panel className='p-3 mb-1'>
        <div className='grid grid-cols-12 items-center'>
          <div className='col-span-6'>
            <p className='text-xs text-muted'>
              Remaining ({transactionType === 'expense' ? 'Expense' : 'Income'})
            </p>
            <p className='text-base font-semibold text-foreground mt-0.5'>
              {totalRemaining.toLocaleString()}원
            </p>
          </div>

          <div className='col-span-6 flex justify-end'>
            <Button
              className='text-xs px-2 py-1 h-auto rounded-sm border border-border text-muted'
              variant='outline'
              onClick={() => router.push('/budget/settings')}
            >
              Budget Setting
            </Button>
          </div>
        </div>
      </Panel>

      <Panel>
        {data.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            percentage={item.rate}
            amount={item.budget}
            color={item.color}
            onClick={() => router.push(`/stats/budget/${item.categoryId}`)}
            variant='with-progress-a'
          />
        ))}
      </Panel>
    </>
  );
}
