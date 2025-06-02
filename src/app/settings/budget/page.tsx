'use client';

import { useRouter } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import CurrencyDisplay from '@/components/ui/custom/currencyDisplay';
import { ChevronRight } from 'lucide-react';

import DateNavigator from '@/components/navigation/DateNavigator';
import { fetchBudgetsByCategory } from '@/modules/budget/hooks/queries';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { Section } from '@/components/ui/temp/section';
import { Button } from '@/components/ui/button';
import { BudgetCategoryItemDTO } from '@/modules/budget/types/types';
import BudgetProgressBar from '@/modules/budget/components/BudgetProgressBar';

export default function BudgetSettingsPage() {
  const router = useRouter();

  const {
    query: { startDate, endDate, timeframe },
  } = useTransactionFilterStore();

  const { data, isLoading, error } = fetchBudgetsByCategory({
    startDate,
    endDate,
    timeframe,
  });

  const handleClick = (item: BudgetCategoryItemDTO) => {
    router.push(`/settings/budget/${item.categoryId}/list`);
  };

  if (isLoading) {
    return (
      <main>
        <DateNavigator variant='dropdown' />
        <Skeleton className='h-40 w-full' />
      </main>
    );
  }

  if (error || !data || data.items.length === 0) {
    return (
      <main>
        <DateNavigator variant='dropdown' />
        <Alert className='text-center'>
          <AlertTitle>No budgets</AlertTitle>
          <AlertDescription>
            Set up budgets to track your expenses.
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  return (
    <Section title='Budget List'>
      <div className='text-right'>
        <DateNavigator variant='dropdown' />
      </div>
      <Card className='flat-card'>
        <CardContent className='flat-card-content divide-y divide-border'>
          {data.items.map((item: BudgetCategoryItemDTO) => {
            const isZero = item.amount === 0;
            return (
              <Button
                variant='ghost'
                key={item.categoryId}
                onClick={() => handleClick(item)}
                className='flex flex-col items-start w-full text-left px-component py-element hover:bg-muted/5 transition-colors gap-2'
              >
                {/* Top Row */}
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center gap-element min-w-0'>
                    <div
                      className='w-2.5 h-2.5 rounded-full border border-border shrink-0'
                      style={{ backgroundColor: `var(${item.color})` }}
                    />
                    <span className='text-body font-medium truncate'>
                      {item.categoryName}
                    </span>
                    <span className='text-label text-muted-foreground capitalize'>
                      ({item.type})
                    </span>
                    {item.isOver && (
                      <span className='ml-2 px-2 py-0.5 text-xs bg-destructive/10 text-destructive rounded'>
                        Over Budget
                      </span>
                    )}
                  </div>

                  <div className='flex items-center gap-1'>
                    <CurrencyDisplay
                      amount={item.amount}
                      className='text-body font-semibold'
                    />
                    <ChevronRight className='icon-sm text-muted-foreground' />
                  </div>
                </div>

                {/* Details Row */}
                <div className='flex justify-between w-full text-label text-muted-foreground px-1'>
                  <span>
                    Used:{' '}
                    <span className='font-medium text-foreground'>
                      <CurrencyDisplay amount={item.used} />
                    </span>
                  </span>
                  <span>
                    Remaining:{' '}
                    <span className='font-medium text-foreground'>
                      <CurrencyDisplay amount={item.remaining} />
                    </span>
                  </span>
                </div>

                {/* Progress Bar */}
                <BudgetProgressBar
                  used={item.used}
                  total={item.amount}
                  isOver={item.isOver}
                />

                {/* No Budget Message */}
                {isZero && (
                  <p className='text-xs text-muted-foreground italic mt-1 px-1'>
                    No budget set for this category.
                  </p>
                )}
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </Section>
  );
}
