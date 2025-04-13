'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { parse, startOfMonth, endOfMonth, format } from 'date-fns';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useShallow } from 'zustand/react/shallow';

import {
  fetchTransactionSummary,
  fetchTransactionSummaryWeekly,
} from '@/features/transaction/hooks';

import { TransactionSummary } from '@/features/transaction/types';
import { DateFilterParams } from '@/features/shared/types';
import MonthlyView from '@/components/common/MonthlyView';

export default function AccountMonthlyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [weeklySummaryByMonth, setWeeklySummaryByMonth] = useState<{
    [key: string]: TransactionSummary[];
  }>({});

  const { transactionSummaryResponse, isLoading } = useTransactionStore(
    useShallow((s) => ({
      transactionSummaryResponse: s.transactionSummaryResponse,
      isLoading: s.isLoading,
    }))
  );

  const { query, setQuery, getDateRangeKey } = useFilterStore(
    useShallow((s) => ({
      query: s.query,
      setQuery: s.setQuery,
      getDateRangeKey: s.getDateRangeKey,
    }))
  );

  const { date, range } = query;

  const dateRangeKey = useMemo(() => getDateRangeKey(0), [getDateRangeKey]);

  useEffect(() => {
    if (range !== 'yearly') {
      setQuery({ range: 'yearly' });
    }
  }, []);

  useEffect(() => {
    const [startDate, endDate] = dateRangeKey.split('_');
    const params: DateFilterParams = {
      groupBy: 'monthly',
      startDate,
      endDate,
    };

    (async () => {
      fetchTransactionSummary(params);
    })();
  }, [dateRangeKey, date, setQuery]);

  const handleToggle = useCallback(
    async (index: number, summary: TransactionSummary) => {
      const isOpening = openIndex !== index;
      setOpenIndex(isOpening ? index : null);

      const label = summary.label;

      if (isOpening && !weeklySummaryByMonth[label]) {
        const monthDate = parse(label, 'yyyy-MM', new Date());
        const startDate = format(startOfMonth(monthDate), 'yyyy-MM-dd');
        const endDate = format(endOfMonth(monthDate), 'yyyy-MM-dd');

        const params: DateFilterParams = {
          groupBy: 'weekly',
          startDate,
          endDate,
        };

        const weeklyRes = await fetchTransactionSummaryWeekly(params);
        const weeklyData: TransactionSummary[] = weeklyRes?.data ?? [];

        setWeeklySummaryByMonth((prev) => ({
          ...prev,
          [label]: weeklyData,
        }));
      }
    },
    [openIndex, weeklySummaryByMonth]
  );

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

  return (
    <MonthlyView
      isLoading={isLoading}
      data={transactionSummaryResponse}
      summaryItems={items}
      openIndex={openIndex}
      weeklySummaryByMonth={weeklySummaryByMonth}
      onToggle={handleToggle}
    />
  );
}
