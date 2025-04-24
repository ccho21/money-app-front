'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/check/Button';
import Panel from '@/components/ui/check/Panel';
import CurrencyDisplay from '@/components/ui/check/CurrencyDisplay';

import type { CategoryType } from '@/modules/category/types';
import type { BaseListSummaryResponseDTO } from '@/common/types';
import type { StatsBudgetGroupItemDTO } from '@/modules/stats/types';
import { BudgetListItem } from './BudgetListItem';

interface BudgetViewProps {
  transactionType: CategoryType;
  budgetGroup: BaseListSummaryResponseDTO<StatsBudgetGroupItemDTO>;
  handleClick?: (categoryId: string, hasBudget: boolean) => void;
}

export default function BudgetView({
  transactionType,
  budgetGroup,
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
              <CurrencyDisplay amount={budgetGroup?.summary?.budget ?? 0} />
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
        {budgetGroup?.items.map((item) => (
          <BudgetListItem
            key={item.categoryId}
            name={item.categoryName}
            rate={item.rate}
            budget={item.budget}
            remaining={item.remaining}
            spent={item.spent}
            label={item.label}
            color={item.color}
            rangeStart={item.rangeStart}
            rangeEnd={item.rangeEnd}
            hasBudget={item.hasBudget}
            onClick={() => handleClick?.(item.categoryId, item.hasBudget)}
          />
        ))}
      </Panel>
    </>
  );
}
