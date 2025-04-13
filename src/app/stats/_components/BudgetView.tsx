'use client';

import { Button } from '@/components/ui/Button';
import { CategoryListItem } from './CategoryListItem';
import Panel from '@/components/ui/Panel';
import { useRouter } from 'next/navigation';
import type { CategoryType } from '@/features/category/types';
import { StatsByBudgetResponse } from '@/features/stats/types';

import CurrencyDisplay from '@/components/ui/CurrencyDisplay';

interface BudgetViewProps {
  transactionType: CategoryType;
  budgetResponse: StatsByBudgetResponse;
  handleClick?: (handleClick: string, hasBudget: boolean) => void;
}

export default function BudgetView({
  transactionType,
  budgetResponse,
  handleClick,
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
            <p className='text-md font-semibold text-foreground mt-0.5'>
              <CurrencyDisplay amount={budgetResponse.totalRemaining} />
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
        {budgetResponse.data.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            rate={item.rate}
            amount={item.categoryType === 'expense' ? item.spent : item.income}
            color={item.color}
            startDate={budgetResponse.startDate}
            endDate={budgetResponse.endDate}
            showProgress={item.hasBudget}
            onClick={() => handleClick?.(item.categoryId, item.hasBudget)}
          />
        ))}
      </Panel>
    </>
  );
}
