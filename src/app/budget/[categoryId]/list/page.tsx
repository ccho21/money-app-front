'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import EmptyMessage from '@/components/ui/message/emptyMessage';
import CurrencyDisplay from '@/components/ui/currency/currencyDisplay';
import { Skeleton } from '@/components/ui/skeleton';
import type { BudgetCategoryPeriodItemDTO } from '@/modules/budget/types/types';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { useGroupedBudgetCategory } from '@/modules/budget/hooks/queries';
import { AddBudgetDrawer } from '@/modules/budget/components/AddBudgetDrawer';
import { EditBudgetDrawer } from '@/modules/budget/components/EditBudgetDrawer';
import { useBudgetFormStore } from '@/modules/budget/stores/formStore';
import { useBudgetStore } from '@/modules/budget/stores/store';
import DateNavigator from '@/components/navigation/DateNavigator';

export default function ListBudgetCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [drawerMode, setDrawerMode] = useState<'new' | 'edit' | null>(null);
  const { setSelectedBudget } = useBudgetStore();

  const {
    query: { startDate, endDate, timeframe },
  } = useTransactionFilterStore();

  const resetForm = useBudgetFormStore((s) => s.resetForm);

  const {
    data: budgetGroup,
    isLoading,
    isError,
  } = useGroupedBudgetCategory(String(categoryId), {
    startDate,
    endDate,
    timeframe,
  });
  const handleSelect = (item: BudgetCategoryPeriodItemDTO) => {
    resetForm();
    if (budgetGroup) {
      setSelectedBudget(item); // 상태 저장
      setDrawerMode(item.isUnconfigured ? 'new' : 'edit');
    }
  };

  if (!categoryId) {
    return (
      <Alert variant='destructive' className='m-component'>
        <AlertDescription>잘못된 접근입니다</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className=''>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className='h-10 w-full rounded-md' />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant='destructive' className='m-component'>
        <AlertDescription>
          예산 데이터를 불러오는 중 오류가 발생했습니다.
        </AlertDescription>
      </Alert>
    );
  }

  if (!budgetGroup || budgetGroup.budgets.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center mt-section'>
        <EmptyMessage />
      </div>
    );
  }

  return (
    <>
      <div className=''>
        <h2 className='text-heading font-semibold mb-component'>
          Budget category List
        </h2>
        <div className='text-right'>
          <DateNavigator variant={timeframe} />
        </div>
        <div className='grid grid-cols-1 gap-component'>
          {budgetGroup.budgets.map((item) => (
            <Card
              key={item.rangeStart}
              className='cursor-pointer hover:bg-muted/5 transition-colors'
              onClick={() => handleSelect(item)}
            >
              <CardContent className='flex justify-between items-center'>
                <div className='text-label font-medium'>{item.label}</div>
                <CurrencyDisplay
                  amount={item.amount}
                  className='text-body font-bold text-primary text-right'
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {drawerMode === 'new' && (
        <AddBudgetDrawer onClose={() => setDrawerMode(null)} />
      )}
      {drawerMode === 'edit' && categoryId && (
        <EditBudgetDrawer onClose={() => setDrawerMode(null)} />
      )}
    </>
  );
}
