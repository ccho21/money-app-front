'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAccountStore } from '@/modules/account/store';
import { useBudgetStore } from '@/modules/budget/store';
import { useFilterStore } from '@/stores/useFilterStore';

import { fetchAccountSummary } from '@/modules/account/hooks';

import type { DateFilterParams } from '@/common/types';

import AccountBox from '@/components/stats/AccountBox';
import EmptyMessage from '@/components/ui/empty/EmptyMessage';
import Panel from '@/components/ui/panel/Panel';
import Divider from '@/components/ui/divider/Divider';
import { useShallow } from 'zustand/shallow';
import { fetchBudgetSummary } from '@/modules/budget/hooks';
import BudgetCard from '@/components/common/BudgetCard';

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

  // ✅ 로딩 / 에러 / 비어있음 처리
  if (isAccountLoading || isBudgetLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  if (accountError || budgetError) {
    return (
      <p className='text-center mt-10 text-error'>
        {accountError ?? budgetError}
      </p>
    );
  }
  console.log('### budgetSummary', budgetSummary);
  console.log('### accountSummary', accountSummary);
  if (!budgetSummary || !accountSummary) {
    return <EmptyMessage />;
  }

  const handleBudgetClick = () => {
    router.push('/stats/budget');
  };

  return (
    <div className='space-y-4'>
      <Panel>
        <AccountBox accounts={accountSummary.items} />
      </Panel>
      <Divider />
      <Panel>
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
      </Panel>
    </div>
  );
}
