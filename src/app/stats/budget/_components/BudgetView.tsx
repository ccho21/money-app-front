// src/app/stats/budget/_components/BudgetView.tsx
'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button/Button';
import Panel from '@/components/ui/panel/Panel';
import CurrencyDisplay from '@/components/ui/currency/CurrencyDisplay';

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
      <Panel className='p-element mb-tight'>
        <div className='grid grid-cols-12 items-center'>
          <div className='col-span-6'>
            <p className='text-caption text-muted'>
              Remaining ({transactionType === 'expense' ? 'Expense' : 'Income'})
            </p>
            <p className='text-body font-semibold text-foreground mt-tight'>
              <CurrencyDisplay
                amount={
                  (budgetGroup.summary?.budget ?? 0) -
                  (budgetGroup.summary?.amount ?? 0)
                }
              />
            </p>
          </div>

          <div className='col-span-6 flex justify-end'>
            <Button
              className='text-caption px-compact py-tight h-auto rounded-input border border-border text-muted'
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
            amount={item.amount}
            label={item.label}
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
