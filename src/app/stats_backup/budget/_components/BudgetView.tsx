'use client';

import { useRouter } from 'next/navigation';

import CurrencyDisplay from '@/components_backup/ui/currency/CurrencyDisplay';
import type { CategoryType } from '@/modules/category/types';
import type { BaseListSummaryResponseDTO } from '@/common/types';
import type { StatsBudgetGroupItemDTO } from '@/modules/stats/types';

import { BudgetListItem } from './BudgetListItem';
import { Button } from '@/components_backup/ui/button';
import { Card, CardHeader, CardTitle } from '@/components_backup/ui/card';

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

  const remainingAmount =
    (budgetGroup.summary?.budget ?? 0) - (budgetGroup.summary?.amount ?? 0);

  return (
    <div className='space-y-component'>
      {/* Remaining Header */}
      <Card className='bg-card text-foreground'>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <div>
            <p className='text-label text-muted-foreground'>
              Remaining ({transactionType === 'expense' ? 'Expense' : 'Income'})
            </p>
            <CardTitle className='text-body mt-tight font-semibold'>
              <CurrencyDisplay amount={remainingAmount} />
            </CardTitle>
          </div>

          <Button
            variant='outline'
            size='sm'
            onClick={() => router.push('/budget/settings')}
          >
            Budget Settings
          </Button>
        </CardHeader>
      </Card>

      {/* Budget Items */}
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
    </div>
  );
}
