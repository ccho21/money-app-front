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
import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';
import { Section } from '@/components/ui/temp/section';

export default function BudgetSettingsPage() {
  const router = useRouter();

  const {
    query: { startDate, endDate, timeframe },
  } = useTransactionFilterStore();

  useTopNavPreset({ title: 'Budget', onBack: () => router.back() });

  const { data, isLoading, error } = fetchBudgetsByCategory({
    startDate,
    endDate,
    timeframe,
  });

  const handleClick = (categoryId: string) => {
    router.push(`/settings/budget/${categoryId}/list`);
  };

  if (isLoading) {
    return (
      <main className='layout-shell'>
        <div className='p-component space-y-component'>
          <DateNavigator variant='dropdown' />
          <Skeleton className='h-40 w-full' />
        </div>
      </main>
    );
  }

  if (error || !data || data.items.length === 0) {
    return (
      <main className='layout-shell'>
        <div className='p-component space-y-component'>
          <DateNavigator variant='dropdown' />
          <Alert className='text-center'>
            <AlertTitle>No budgets</AlertTitle>
            <AlertDescription>
              Set up budgets to track your expenses.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }

  return (
    <main className='layout-shell'>
      <div className='p-component space-y-component'>
        <Section title='Budget List'>
          <div className='text-right'>
            <DateNavigator variant='dropdown' />
          </div>
          <Card className='flat-card'>
            <CardContent className='flat-card-content divide-y divide-border'>
              {data.items.map((item) => (
                <button
                  key={item.categoryId}
                  onClick={() => handleClick(item.categoryId)}
                  className='flex w-full items-center justify-between px-component py-element text-left hover:bg-muted/10 transition-colors'
                >
                  <div className='flex items-center gap-element min-w-0'>
                    <div
                      className='w-2.5 h-2.5 rounded-full border border-border shrink-0'
                      style={{ backgroundColor: item.color }}
                    />
                    <span className='text-body font-medium truncate'>
                      {item.categoryName}
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <CurrencyDisplay
                      amount={item.amount}
                      className='text-body font-semibold'
                    />
                    <ChevronRight className='icon-sm text-muted-foreground' />
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </Section>
      </div>
    </main>
  );
}
