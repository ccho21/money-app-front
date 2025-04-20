'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { format, startOfYear, endOfYear, addYears, parse } from 'date-fns';

import { useTransactionStore } from '@/modules/transaction/store';
import { useFilterStore } from '@/stores/useFilterStore';
import { useShallow } from 'zustand/react/shallow';

import { fetchTransactionSummary } from '@/modules/transaction/hooks';
import { DateFilterParams } from '@/shared/types';
import YearlyView from '@/components/dashboard/YearlyView';

//
// Yearly transaction summary page
//
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

  const { date, groupBy } = query;

  //
  // Calculate 5-year date groupBy from current date
  //
  const dateRangeKey = useMemo(() => {
    const start = startOfYear(addYears(date, -5));
    const end = endOfYear(date);
    return `${format(start, 'yyyy-MM-dd')}_${format(end, 'yyyy-MM-dd')}`;
  }, [date]);

  //
  // Fetch yearly transaction summary if groupBy is correct
  //
  useEffect(() => {
    const [startDate, endDate] = dateRangeKey.split('_');
    const params: DateFilterParams = {
      groupBy: 'yearly',
      startDate,
      endDate,
    };

    if (groupBy !== 'yearly') {
      setQuery({ groupBy: 'yearly' });
    } else {
      fetchTransactionSummary(params);
    }
  }, [dateRangeKey, groupBy, setQuery]);

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

  //
  // Handle year item click by updating the query date
  //
  const handleClick = useCallback(
    (dateStr: string) => {
      const parsed = parse(dateStr, 'yyyy', new Date());
      setQuery({ date: parsed });
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
