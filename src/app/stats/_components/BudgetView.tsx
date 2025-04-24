'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/check/Button';
import { CategoryListItem } from './CategoryListItem';
import Panel from '@/components/ui/check/Panel';
import CurrencyDisplay from '@/components/ui/check/CurrencyDisplay';

import type { CategoryType } from '@/modules/category/types';
import type { BaseListSummaryResponseDTO } from '@/common/types';
import type { StatsBudgetGroupItemDTO } from '@/modules/stats/types';

interface BudgetViewProps {
  transactionType: CategoryType;
  budgetResponse: BaseListSummaryResponseDTO<StatsBudgetGroupItemDTO>;
  handleClick?: (categoryId: string, hasBudget: boolean) => void;
}

export default function BudgetView({
  transactionType,
  budgetResponse,
  handleClick,
}: BudgetViewProps) {
  const router = useRouter();

  const totalRemaining = useMemo(
    () => budgetResponse.items.reduce((sum, item) => sum + item.remaining, 0),
    [budgetResponse]
  );

  return (
    <>
      <Panel className="p-3 mb-1">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-6">
            <p className="text-xs text-muted">
              Remaining ({transactionType === 'expense' ? 'Expense' : 'Income'})
            </p>
            <p className="text-md font-semibold text-foreground mt-0.5">
              <CurrencyDisplay amount={totalRemaining} />
            </p>
          </div>

          <div className="col-span-6 flex justify-end">
            <Button
              className="text-xs px-2 py-1 h-auto rounded-sm border border-border text-muted"
              variant="outline"
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
