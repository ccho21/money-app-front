'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { format, startOfYear, endOfYear, addYears, parse } from 'date-fns';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useFilterStore } from '@/stores/useFilterStore';
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

  const { query, setQuery } = useFilterStore(
    useShallow((s) => ({
      query: s.query,
      setQuery: s.setQuery,
    }))
  );

  const { date, range } = query;

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
      setQuery({ range: 'yearly' });
    } else {
      fetchTransactionSummary(params);
    }
  }, [dateRangeKey, range, setQuery]);

  const totalIncome = transactionSummaryResponse?.incomeTotal ?? 0;
  const totalExpense = transactionSummaryResponse?.expenseTotal ?? 0;

  const items = [
    {
      label: 'Income',
      value: totalIncome,
      color: totalIncome > 0 ? 'text-info' : 'text-muted',
      prefix: '$',
    },
    {
      label: 'Exp.',
      value: totalExpense,
      color: totalExpense > 0 ? 'text-error' : 'text-muted',
      prefix: '$',
    },
    {
      label: 'Total',
      value: totalIncome - totalExpense,
      color: 'text-foreground',
      prefix: '$',
    },
  ];

  const handleClick = useCallback(
    (dateStr: string) => {
      const parsed = parse(dateStr, 'yyyy', new Date());
      setQuery({ date: parsed });
      // 필요시 여기서 router.push(...) 로 이동 가능
    },
    [setQuery]
  );

  return (
    <YearlyView
      isLoading={isLoading}
      data={transactionSummaryResponse}
      summaryItems={items}
      onItemClick={handleClick}
    />
  );
}
