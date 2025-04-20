'use client';

import { Button } from '@/components/ui/check/Button';
import { CategoryListItem } from './CategoryListItem';
import Panel from '@/components/ui/check/Panel';
import { useRouter } from 'next/navigation';
import type { CategoryType } from '@/features/category/types';

import CurrencyDisplay from '@/components/ui/check/CurrencyDisplay';
import { BaseListSummaryResponseDTO } from '@/shared/types';
import { StatsBudgetGroupItemDTO } from '@/features/stats/types';
import { useMemo } from 'react';

interface BudgetViewProps {
  transactionType: CategoryType;
  budgetResponse: BaseListSummaryResponseDTO<StatsBudgetGroupItemDTO>;
  handleClick?: (handleClick: string, hasBudget: boolean) => void;
}

export default function BudgetView({
  transactionType,
  budgetResponse,
  handleClick,
}: BudgetViewProps) {
  const router = useRouter();

  const totalRemaning = useMemo(
    () => budgetResponse.items.reduce((sum, item) => sum + item.remaining, 0),
    [budgetResponse]
  );
  return (
    <>
      <Panel className='p-3 mb-1'>
        <div className='grid grid-cols-12 items-center'>
          <div className='col-span-6'>
            <p className='text-xs text-muted'>
              Remaining ({transactionType === 'expense' ? 'Expense' : 'Income'})
            </p>
            <p className='text-md font-semibold text-foreground mt-0.5'>
              <CurrencyDisplay amount={totalRemaning} />
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
        {budgetResponse.items.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            rate={item.rate}
            spent={item.spent}
            budget={item.budget}
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
