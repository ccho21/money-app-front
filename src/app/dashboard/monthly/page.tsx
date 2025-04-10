'use client';

import { useEffect, useState, useCallback } from 'react';
import { parse, startOfMonth, endOfMonth, format } from 'date-fns';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useShallow } from 'zustand/react/shallow';

import {
  fetchTransactionSummary,
  fetchTransactionSummaryWeekly,
} from '@/services/transactionService';

import { TransactionSummary } from '@/features/transaction/types';
import { DateFilterParams } from '@/features/shared/types';
import MonthlyView from '@/components/common/MonthlyView';

export default function MonthlyPage() {
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
  const { range, date } = query;

  useEffect(() => {
    if (range !== 'yearly') setQuery({ range: 'yearly' });
  }, [range, setQuery]);

  useEffect(() => {
    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      groupBy: 'monthly',
      startDate,
      endDate,
    };
    (async () => {
      fetchTransactionSummary(params);
    })();
  }, [getDateRangeKey, date]);

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
      prefix: '$',
      color: 'text-info',
    },
    {
      label: 'Exp.',
      value: totalExpense,
      prefix: '$',
      color: 'text-error',
    },
    {
      label: 'Total',
      value: totalIncome - totalExpense,
      prefix: '$',
      color: 'text-success',
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
