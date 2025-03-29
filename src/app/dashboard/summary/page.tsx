'use client';

import { useEffect, useMemo } from 'react';
import { useAccountStore } from '@/stores/useAccountStore';
import { useBudgetStore } from '@/stores/useBudgetStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { getDateRange } from '@/lib/utils';
import { AccountTransactionSummaryParams } from '@/features/account/types';
import SummaryBox from '@/components/ui/SummaryBox';
import AccountsBox from './_components/AccountsBox';
import BudgetBox from './_components/BudgetBox';

export default function SummaryPage() {
  const { date } = useDateFilterStore();

  const dateRange = useMemo(
    () => getDateRange(date, { unit: 'month', amount: 0 }),
    [date]
  );

  const {
    summaries,
    isLoading: isAccountLoading,
    error: accountError,
    fetchAccountTransactionSummary,
  } = useAccountStore();

  const {
    budgetUsageItems,
    isLoading: isBudgetLoading,
    error: budgetError,
    fetchBudgetUsage,
  } = useBudgetStore();

  // 🧠 fetch params 메모이제이션
  const fetchParams: AccountTransactionSummaryParams = useMemo(() => {
    return { ...dateRange };
  }, [dateRange]);

  // 📦 데이터 fetch
  useEffect(() => {
    fetchAccountTransactionSummary(fetchParams);
    fetchBudgetUsage(fetchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchParams]);

  // 💰 총합 계산
  const incomeTotal = useMemo(
    () => summaries.reduce((acc, s) => acc + s.incomeTotal, 0),
    [summaries]
  );

  const expenseTotal = useMemo(
    () => summaries.reduce((acc, s) => acc + s.expenseTotal, 0),
    [summaries]
  );

  const totalBudgetAmount = useMemo(
    () => budgetUsageItems.reduce((acc, b) => acc + b.budgetAmount, 0),
    [budgetUsageItems]
  );

  const totalBudgetUsed = useMemo(
    () => budgetUsageItems.reduce((acc, b) => acc + b.usedAmount, 0),
    [budgetUsageItems]
  );

  const totalBudgetUsedPercent = useMemo(() => {
    if (budgetUsageItems.length === 0) return 0;
    return (
      budgetUsageItems.reduce((acc, b) => acc + b.usedPercent, 0) /
      budgetUsageItems.length
    );
  }, [budgetUsageItems]);

  const totalItem = {
    categoryId: '',
    categoryName: 'Total Budget',
    budgetAmount: totalBudgetAmount,
    usedAmount: totalBudgetUsed,
    usedPercent: totalBudgetUsedPercent,
  };

  // 🔄 로딩 중
  if (isAccountLoading || isBudgetLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  // ⚠️ 에러
  if (accountError || budgetError) {
    return (
      <p className='text-center mt-10 text-red-500'>
        {accountError ?? budgetError}
      </p>
    );
  }

  // 🚫 데이터 없음
  if (!summaries.length) {
    return <p className='text-center mt-10 text-gray-400'>데이터가 없습니다</p>;
  }

  return (
    <div className='px-4 space-y-6'>
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

      <AccountsBox accounts={summaries} />
      <BudgetBox item={totalItem} />
    </div>
  );
}
