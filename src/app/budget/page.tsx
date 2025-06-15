'use client';

import { useRouter } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import CurrencyDisplay from '@/components/ui/currency/currencyDisplay';
import { ChevronRight } from 'lucide-react';

import DateNavigator from '@/components/navigation/DateNavigator';
import { useBudgetsByCategory } from '@/modules/budget/hooks/queries';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import {
  Section,
  SectionSubtitle,
  SectionTitle,
} from '@/components/ui/layout/section';
import { BudgetCategoryItem } from '@/modules/budget/types/types';
import BudgetProgressBar from '@/modules/budget/components/BudgetProgressBar';
import { Badge } from '@/components/ui/badge';

export default function BudgetSettingsPage() {
  const router = useRouter();

  const {
    query: { startDate, endDate, timeframe },
  } = useTransactionFilterStore();

  const { data, isLoading, error } = useBudgetsByCategory({
    startDate,
    endDate,
    timeframe,
  });

  const handleClick = (item: BudgetCategoryItem) => {
    router.push(`/budget/${item.categoryId}/list`);
  };

  if (isLoading) {
    return (
      <Section>
        <DateNavigator variant='dropdown' />
        <Skeleton className='h-40 w-full' />
      </Section>
    );
  }

  if (error || !data || data.items.length === 0) {
    return (
      <Section>
        <DateNavigator variant='dropdown' />
        <Alert className='text-center'>
          <AlertTitle>No budgets</AlertTitle>
          <AlertDescription>
            Set up budgets to track your expenses.
          </AlertDescription>
        </Alert>
      </Section>
    );
  }

  return (
    <>
      <Section className='border-border'>
        <div className='flex justify-between items-center'>
          <SectionTitle>Monthly Spending Plan</SectionTitle>
          <DateNavigator variant='dropdown' />
        </div>
        <SectionSubtitle>
          Set limits and track your spending by category
        </SectionSubtitle>
      </Section>
      <Section>
        <div className='space-y-3'>
          {data.items.map((item: BudgetCategoryItem) => {
            const isZero = item.amount === 0;
            return (
              <Card
                className='flat-card shadow-2xs !p-element'
                key={item.categoryId}
                onClick={() => handleClick(item)}
                role='button'
                tabIndex={0}
              >
                <CardContent className='flat-card-content'>
                  {/* Top Row */}
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-3 min-w-0'>
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
                        <Badge variant='destructive'>Over Budget</Badge>
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
                  <div className='flex justify-between w-full text-label text-muted-foreground px-1 mt-2'>
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
                  <div className='mt-2 mb-1'>
                    <BudgetProgressBar
                      used={item.used}
                      total={item.amount}
                      isOver={item.isOver}
                    />
                  </div>
                  {/* No Budget Message */}
                  {isZero && (
                    <p className='text-xs text-muted-foreground italic mt-1 px-1'>
                      No budget set for this category.
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
}
