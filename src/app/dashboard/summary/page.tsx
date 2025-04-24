'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useAccountStore } from '@/modules/account/store';
import { useBudgetStore } from '@/modules/budget/store';
import { useFilterStore } from '@/stores/useFilterStore';

import { fetchAccountSummary } from '@/modules/account/hooks';

import type { DateFilterParams } from '@/common/types';

import SummaryBox from '@/components/stats/SummaryBox';
import BudgetBox from '@/components/stats/BudgetBox';
import AccountBox from '@/components/stats/AccountBox';
import EmptyMessage from '@/components/ui/check/EmptyMessage';
import Panel from '@/components/ui/check/Panel';
import Divider from '@/components/ui/check/Divider';
import { useShallow } from 'zustand/shallow';
import { fetchBudgetSummary } from '@/modules/budget/hooks';

export default function SummaryPage() {
  const router = useRouter();

  const { query, setQuery, getDateRangeKey } = useFilterStore();
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

  // ✅ 필터 기준 params

  useEffect(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      startDate,
      endDate,
      groupBy: 'monthly',
    };
    fetchAccountSummary(params);
    fetchBudgetSummary(params);
  }, [date, getDateRangeKey]);

  const [incomeTotal, expenseTotal] = useMemo(() => {
    if (!accountSummary?.items?.length) return [0, 0];
    return [
      accountSummary.items.reduce((sum, item) => sum + item.totalIncome, 0),
      accountSummary.items.reduce((sum, item) => sum + item.totalExpense, 0),
    ];
  }, [accountSummary]);

  const summaryItems = useMemo(
    () => [
      {
        label: 'Income',
        value: incomeTotal,
        color: incomeTotal > 0 ? 'text-info' : 'text-muted',
        prefix: '$',
      },
      {
        label: 'Exp.',
        value: expenseTotal,
        color: expenseTotal > 0 ? 'text-error' : 'text-muted',
        prefix: '$',
      },
      {
        label: 'Total',
        value: incomeTotal - expenseTotal,
        color: 'text-foreground',
        prefix: '$',
      },
    ],
    [incomeTotal, expenseTotal]
  );

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
        <SummaryBox items={summaryItems} />
      </Panel>

      <Panel>
        <AccountBox accounts={accountSummary.items} />
      </Panel>

      <Divider />

      <Panel>
        <BudgetBox item={budgetSummary} handleClick={handleBudgetClick} />
      </Panel>
    </div>
  );
}
