'use client';

import { useEffect, useRef } from 'react';
import { useAccountStore } from '@/stores/useAccountStore';
import { useBudgetStore } from '@/stores/useBudgetStore';
import { useFilterStore } from '@/stores/useFilterStore';

import SummaryBox from '@/components/ui/SummaryBox';
import BudgetBox from './_components/BudgetBox';

import { fetchAccountTransactionSummary } from '@/services/accountService';
import { fetchBudgetSummary } from '@/services/budgetService';
import { DateFilterParams } from '@/features/shared/types';
import { BudgetSummary } from '@/features/budget/types';
import EmptyMessage from '@/components/ui/EmptyMessage';
import Panel from '@/components/ui/Panel';

export default function SummaryPage() {
  const { getDateRangeKey } = useFilterStore();

  const {
    state: {
      summaryResponse,
      isLoading: isAccountLoading,
      error: accountError,
    },
  } = useAccountStore();

  const {
    state: {
      budgetSummaryResponse,
      isLoading: isBudgetLoading,
      error: budgetError,
    },
  } = useBudgetStore();

  const dateRangeKey = getDateRangeKey(); // ✅ store 내부 함수 사용

  const fetchedKeyRef = useRef<string | null>(null);

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

  if (!budgetSummaryResponse || !budgetSummaryResponse.data.length) {
    return <EmptyMessage />;
  }

  if (!summaryResponse || !summaryResponse.data.length) {
    return <EmptyMessage />;
  }

  return (
    <div className='space-y-4'>
      <Panel>
        <SummaryBox
          items={[
            {
              label: 'Income',
              value: summaryResponse.incomeTotal,
              color:
                summaryResponse.incomeTotal > 0 ? 'text-info' : 'text-muted',
              prefix: '$',
            },
            {
              label: 'Exp.',
              value: summaryResponse.expenseTotal,
              color:
                summaryResponse.expenseTotal > 0 ? 'text-error' : 'text-muted',
              prefix: '$',
            },
            {
              label: 'Total',
              value: summaryResponse.incomeTotal - summaryResponse.expenseTotal,
              color: 'text-foreground',
              prefix: '$',
            },
          ]}
        />
      </Panel>

      <Panel>
        {budgetSummaryResponse.data.map((summary: BudgetSummary) => (
          <BudgetBox key={summary.categoryId} item={summary} />
        ))}
      </Panel>
    </div>
  );
}
