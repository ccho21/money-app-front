// 📄 src/app/(routes)/stats/summary/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import { useAccountStore } from '@/modules/account/store';
import { useBudgetStore } from '@/modules/budget/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchAccountSummary } from '@/modules/account/hooks';
import { fetchBudgetSummary } from '@/modules/budget/hooks';

import type { DateFilterParams } from '@/common/types';

import { useSummaryBoxItems } from '@/app/hooks/useSummaryBoxItems';
import { Card, CardContent } from '@/components_backup/ui/card';
import EmptyMessage from '@/components/ui/custom/emptyMessage';
import SummaryBox from '@/components/common/SummaryBox';
import DateNavigator from '@/components/navigation/DateNavigator';
import AccountBox from '../components/AccountBox';
import BudgetCard from '../components/BudgetCard';

export default function SummaryPage() {
  const router = useRouter();

  const { query, setQuery, getDateRangeKey, isInitialized } = useFilterStore();
  const { groupBy, date } = query;

  const {
    summary: accountSummary,
    isLoading: isAccountLoading,
    error: accountError,
  } = useAccountStore(
    useShallow((s) => ({
      summary: s.summary,
      isLoading: s.isLoading,
      error: s.error,
    }))
  );

  const {
    summary: budgetSummary,
    isLoading: isBudgetLoading,
    error: budgetError,
  } = useBudgetStore(
    useShallow((s) => ({
      summary: s.summary,
      isLoading: s.isLoading,
      error: s.error,
    }))
  );

  useEffect(() => {
    if (groupBy !== 'monthly') {
      setQuery({ groupBy: 'monthly' });
    }
  }, [groupBy, setQuery]);

  useEffect(() => {
    if (!isInitialized) return;

    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      startDate,
      endDate,
      groupBy: 'monthly',
    };
    Promise.all([fetchAccountSummary(params), fetchBudgetSummary(params)]);
  }, [date, getDateRangeKey, isInitialized]);

  const summaryItems = useSummaryBoxItems('summary');

  const handleBudgetClick = () => {
    router.push('/stats/budget');
  };

  if (isAccountLoading || isBudgetLoading) {
    return <p className='text-center mt-section text-muted'>Loading...</p>;
  }

  if (accountError || budgetError) {
    return (
      <p className='text-center mt-section text-error'>
        {accountError ?? budgetError}
      </p>
    );
  }

  if (!budgetSummary || !accountSummary) {
    return <EmptyMessage />;
  }

  return (
    <div className='bg-background p-compact'>
      <SummaryBox items={summaryItems} />
      <DateNavigator />

      {/* Accounts */}
      <section className='mb-component'>
        <Card className='p-0'>
          <CardContent className='p-tight'>
            <AccountBox accounts={accountSummary.items} />
          </CardContent>
        </Card>
      </section>

      {/* Budget */}
      <section className='mb-component'>
        <Card className='p-0'>
          <CardContent className='p-0'>
            <BudgetCard
              name={'Budget'}
              budget={budgetSummary.totalBudget}
              spent={budgetSummary.totalSpent}
              rate={budgetSummary.rate}
              label={budgetSummary.label}
              startDate={budgetSummary.rangeStart}
              endDate={budgetSummary.rangeEnd}
              hasBudget={true}
              onClick={handleBudgetClick}
              variant='summary'
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
