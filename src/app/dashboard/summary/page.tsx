'use client';

import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useAccountStore } from '@/stores/useAccountStore';
import { useBudgetStore } from '@/stores/useBudgetStore';
import { useFilterStore } from '@/stores/useFilterStore';

import SummaryBox from '@/components/stats/SummaryBox';
import BudgetBox from '../../../components/stats/BudgetBox';
import EmptyMessage from '@/components/ui/EmptyMessage';
import Panel from '@/components/ui/Panel';

import { fetchAccountSummary } from '@/features/account/hooks';
import { fetchBudgetSummary } from '@/features/budget/hooks';
import { DateFilterParams } from '@/features/shared/types';
import AccountBox from '../../../components/stats/AccountBox';
import Divider from '@/components/ui/Divider';
import { useRouter } from 'next/navigation';

export default function SummaryPage() {
  const router = useRouter();
  const { query, getDateRangeKey, setQuery } = useFilterStore();
  const { date, range } = query;

  const {
    summaryResponse,
    isLoading: isAccountLoading,
    error: accountError,
  } = useAccountStore(
    useShallow((state) => ({
      summaryResponse: state.state.summaryResponse,
      isLoading: state.state.isLoading,
      error: state.state.error,
    }))
  );

  const {
    budgetSummaryResponse,
    isLoading: isBudgetLoading,
    error: budgetError,
  } = useBudgetStore(
    useShallow((state) => ({
      budgetSummaryResponse: state.state.budgetSummaryResponse,
      isLoading: state.state.isLoading,
      error: state.state.error,
    }))
  );

  // ✅ 항상 monthly 기준으로
  useEffect(() => {
    if (range !== 'monthly') setQuery({ range: 'monthly' });
  }, [range, setQuery]);

  // ✅ 데이터 fetch
  useEffect(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      startDate,
      endDate,
      groupBy: range,
    };

    console.log('### PARAMS', params);

    (async () => {
      await Promise.all([
        fetchAccountSummary(params),
        fetchBudgetSummary(params),
      ]);
    })();
  }, [getDateRangeKey, date, range]);

  // ✅ 총합 계산
  const summaryItems = useMemo(() => {
    if (!summaryResponse || summaryResponse.length === 0) return [];

    const incomeTotal = summaryResponse.reduce(
      (sum, item) => sum + item.incomeTotal,
      0
    );
    const expenseTotal = summaryResponse.reduce(
      (sum, item) => sum + item.expenseTotal,
      0
    );

    return [
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
    ];
  }, [summaryResponse]);

  if (isAccountLoading || isBudgetLoading) {
    return <p className='text-center mt-10 text-muted'>불러오는 중...</p>;
  }

  if (accountError || budgetError) {
    return (
      <p className='text-center mt-10 text-error'>
        {accountError ?? budgetError}
      </p>
    );
  }

  if (!budgetSummaryResponse || !summaryResponse?.length) {
    return <EmptyMessage />;
  }

  const handleClick = () => {
    router.push('/stats/budget');
  };
  return (
    <div className='space-y-4'>
      <Panel>
        <SummaryBox items={summaryItems} />
      </Panel>
      <Panel>
        <AccountBox accounts={summaryResponse}></AccountBox>
      </Panel>
      <Divider></Divider>
      <Panel>
        <BudgetBox item={budgetSummaryResponse} handleClick={handleClick} />
      </Panel>
    </div>
  );
}
