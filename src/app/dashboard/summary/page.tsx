'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAccountStore } from '@/stores/useAccountStore';
import { useBudgetStore } from '@/stores/useBudgetStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { fetchAccountSummary } from '@/features/account/hooks';
import { fetchBudgetSummary } from '@/features/budget/hooks';
import { DateFilterParams } from '@/features/shared/types';
import SummaryBox from '@/components/stats/SummaryBox';
import BudgetBox from '@/components/stats/BudgetBox';
import AccountBox from '@/components/stats/AccountBox';
import EmptyMessage from '@/components/ui/EmptyMessage';
import Panel from '@/components/ui/Panel';
import Divider from '@/components/ui/Divider';

//
// Dashboard summary page: shows account + budget stats in a snapshot
//
export default function SummaryPage() {
  const router = useRouter();
  const { query, getDateRangeKey, setQuery } = useFilterStore();
  const { date, groupBy } = query;

  const summaryResponse = useAccountStore((s) => s.state.summaryResponse);
  const isAccountLoading = useAccountStore((s) => s.state.isLoading);
  const accountError = useAccountStore((s) => s.state.error);

  const budgetSummaryResponse = useBudgetStore(
    (s) => s.state.budgetSummaryResponse
  );
  const isBudgetLoading = useBudgetStore((s) => s.state.isLoading);
  const budgetError = useBudgetStore((s) => s.state.error);

  //
  // Ensure groupBy is 'monthly' only when needed
  //
  useEffect(() => {
    if (groupBy !== 'monthly') {
      setQuery({ groupBy: 'monthly' });
    }
  }, [groupBy, setQuery]);

  //
  // Compute startDate / endDate only once per groupBy change
  //
  const params: DateFilterParams = useMemo(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    return {
      startDate,
      endDate,
      groupBy: 'monthly',
    };
  }, [getDateRangeKey]); // ✅ date를 꼭 포함해야 한다

  //
  // Fetch account and budget summaries only if missing
  //
  useEffect(() => {
    (async () => {
      fetchAccountSummary(params);
      fetchBudgetSummary(params);
    })();
  }, [params, date]);

  //
  // Memoize computed totals
  //
  const [incomeTotal, expenseTotal] = useMemo(() => {
    if (!summaryResponse?.items || !summaryResponse?.items.length)
      return [0, 0];
    return [
      summaryResponse.items.reduce((sum, item) => sum + item.incomeTotal, 0),
      summaryResponse.items.reduce((sum, item) => sum + item.expenseTotal, 0),
    ];
  }, [summaryResponse]);

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

  //
  // Handle loading and error state
  //
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

  if (!budgetSummaryResponse || !summaryResponse?.items.length) {
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
        <AccountBox accounts={summaryResponse.items} />
      </Panel>
      <Divider />
      <Panel>
        <BudgetBox item={budgetSummaryResponse} handleClick={handleClick} />
      </Panel>
    </div>
  );
}
