'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useAccountStore } from '@/stores/useAccountStore';
import { useBudgetStore } from '@/stores/useBudgetStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';

import SummaryBox from '@/components/ui/SummaryBox';
import AccountsBox from './_components/AccountsBox';
import BudgetBox from './_components/BudgetBox';

import { fetchAccountTransactionSummary } from '@/services/accountService';
import { fetchBudgetSummary } from '@/services/budgetService';
import { getDateRangeKey } from '@/lib/date.util';
import { DateFilterParams } from '@/features/shared/types';
import { BudgetSummary } from '@/features/budget/types';
import EmptyMessage from '@/components/ui/EmptyMessage';
import Panel from '@/components/ui/Panel';

export default function SummaryPage() {
  const {
    state: { date },
  } = useDateFilterStore();

  const {
    state: { summaries, isLoading: isAccountLoading, error: accountError },
  } = useAccountStore();

  const {
    state: {
      budgetSummaryResponse,
      isLoading: isBudgetLoading,
      error: budgetError,
    },
  } = useBudgetStore();

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: 'monthly', amount: 0 }),
    [date]
  );

  const fetchedKeyRef = useRef<string | null>(null);

  // ✅ 중복 호출 방지
  useEffect(() => {
    if (fetchedKeyRef.current === dateRangeKey) return;

    const run = async () => {
      const [startDate, endDate] = dateRangeKey.split('_');
      const params: DateFilterParams = { startDate, endDate };
      console.log('### SUMMARY fetchAccountTransactionSummary');
      await fetchAccountTransactionSummary(params);
      await fetchBudgetSummary(params);
      fetchedKeyRef.current = dateRangeKey;
    };

    run();
  }, [dateRangeKey]);

  // ✅ 총합 계산
  const incomeTotal = useMemo(
    () => summaries.reduce((acc, s) => acc + s.incomeTotal, 0),
    [summaries]
  );

  const expenseTotal = useMemo(
    () => summaries.reduce((acc, s) => acc + s.expenseTotal, 0),
    [summaries]
  );

  // ✅ 로딩 중
  if (isAccountLoading || isBudgetLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  // ✅ 에러
  if (accountError || budgetError) {
    return (
      <p className='text-center mt-10 text-red-500'>
        {accountError ?? budgetError}
      </p>
    );
  }

  // ✅ 데이터 없음
  if (!budgetSummaryResponse || !budgetSummaryResponse.data.length) {
    return <EmptyMessage />;
  }

  return (
    <div className=''>
      <Panel>
        <SummaryBox
          items={[
            {
              label: 'Income',
              value: incomeTotal,
              color: incomeTotal > 0 ? 'text-[#3C50E0]' : 'text-gray-400',
              prefix: '₩',
            },
            {
              label: 'Exp.',
              value: expenseTotal,
              color: expenseTotal > 0 ? 'text-[#fb5c4c]' : 'text-gray-400',
              prefix: '₩',
            },
            {
              label: 'Total',
              value: incomeTotal - expenseTotal,
              color: 'text-gray-900 dark:text-white',
              prefix: '₩',
            },
          ]}
        />
      </Panel>

      <Panel>
        <AccountsBox accounts={summaries} />
      </Panel>

      <Panel>
        {budgetSummaryResponse.data.map((summary: BudgetSummary) => (
          <BudgetBox key={summary.categoryId} item={summary} />
        ))}
      </Panel>
    </div>
  );
}
