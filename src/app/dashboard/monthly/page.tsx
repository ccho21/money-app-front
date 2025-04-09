'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { parse, startOfMonth, endOfMonth, format } from 'date-fns';

import { useTransactionStore } from '@/stores/useTransactionStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useShallow } from 'zustand/react/shallow';

import {
  fetchTransactionSummary,
  fetchTransactionSummaryWeekly,
} from '@/services/transactionService';

import { TransactionSummary } from '@/features/transaction/types';
import { DateFilterParams } from '@/features/shared/types';
import { getDateRangeKey } from '@/lib/date.util';
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

  const { date, range, setRange } = useDateFilterStore(
    useShallow((s) => ({
      date: s.state.date,
      range: s.state.range,
      setRange: s.actions.setRange,
    }))
  );

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: 'yearly', amount: 0 }),
    [date]
  );

  useEffect(() => {
    const [startDate, endDate] = dateRangeKey.split('_');
    const params: DateFilterParams = {
      groupBy: 'monthly',
      startDate,
      endDate,
    };

    if (range !== 'yearly') {
      setRange('yearly');
    } else {
      fetchTransactionSummary(params);
    }
  }, [dateRangeKey, range, setRange]);

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
    },
    {
      label: 'Exp.',
      value: totalExpense,
      prefix: '$',
    },
    {
      label: 'Total',
      value: totalIncome - totalExpense,
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
