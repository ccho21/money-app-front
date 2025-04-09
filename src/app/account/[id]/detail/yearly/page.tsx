'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { format, startOfYear, endOfYear, addYears, parse } from 'date-fns';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useShallow } from 'zustand/react/shallow';

import { fetchTransactionSummary } from '@/services/transactionService';
import { DateFilterParams } from '@/features/shared/types';
import YearlyView from '@/components/common/YearlyView';

export default function YearlyPage() {
  const { transactionSummaryResponse, isLoading } = useTransactionStore(
    useShallow((s) => ({
      transactionSummaryResponse: s.transactionSummaryResponse,
      isLoading: s.isLoading,
    }))
  );

  const { date, range, setRange, setDate } = useDateFilterStore(
    useShallow((s) => ({
      date: s.state.date,
      range: s.state.range,
      setRange: s.actions.setRange,
      setDate: s.actions.setDate,
    }))
  );

  const dateRangeKey = useMemo(() => {
    const start = startOfYear(addYears(date, -5));
    const end = endOfYear(date);
    return `${format(start, 'yyyy-MM-dd')}_${format(end, 'yyyy-MM-dd')}`;
  }, [date]);

  useEffect(() => {
    const [startDate, endDate] = dateRangeKey.split('_');
    const params: DateFilterParams = {
      groupBy: 'yearly',
      startDate,
      endDate,
    };

    if (range !== 'yearly') {
      setRange('yearly');
    } else {
      fetchTransactionSummary(params);
    }
  }, [dateRangeKey, range, setRange]);

  const totalIncome = transactionSummaryResponse?.incomeTotal ?? 0;
  const totalExpense = transactionSummaryResponse?.expenseTotal ?? 0;
  const summaryItems = [
    { label: 'Income', value: totalIncome, prefix: '$' },
    { label: 'Exp.', value: totalExpense, prefix: '$' },
    { label: 'Total', value: totalIncome - totalExpense, prefix: '$' },
  ];

  // ✅ 연도 클릭 핸들러
  const handleClick = useCallback(
    (dateStr: string) => {
      const parsed = parse(dateStr, 'yyyy', new Date());
      setDate(parsed);
      // 예: route 이동 추가하고 싶다면 여기에 router.push() 등
    },
    [setDate]
  );

  return (
    <YearlyView
      isLoading={isLoading}
      data={transactionSummaryResponse}
      summaryItems={summaryItems}
      onItemClick={handleClick}
    />
  );
}
