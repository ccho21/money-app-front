'use client';

import { useEffect, useState, useCallback } from 'react';
import { parse, startOfMonth, endOfMonth, format } from 'date-fns';

import { useTransactionStore } from '@/modules/transaction/store';
import { useFilterStore } from '@/stores/useFilterStore';

import {
  fetchTransactionSummary,
  fetchTransactionSummaryWeekly,
} from '@/modules/transaction/hooks';

import type { TransactionGroupItemDTO } from '@/modules/transaction/types';
import type { DateFilterParams } from '@/common/types';

import { useShallow } from 'zustand/shallow';
import dynamic from 'next/dynamic';
const MonthlyView = dynamic(
  () => import('@/components/dashboard/MonthlyView'),
  {
    ssr: false,
  }
);

export default function MonthlyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [weeklySummaryByMonth, setWeeklySummaryByMonth] = useState<{
    [key: string]: TransactionGroupItemDTO[];
  }>({});

  const { summary, isLoading } = useTransactionStore(
    useShallow((s) => ({
      summary: s.summary,
      isLoading: s.isLoading,
    }))
  );

  const { query, setQuery, getDateRangeKey, isInitialized } = useFilterStore();
  const { groupBy, date } = query;

  // ✅ groupBy를 'yearly'로 고정
  useEffect(() => {
    if (groupBy !== 'yearly') {
      setQuery({ groupBy: 'yearly' });
    }
  }, [groupBy, setQuery]);

  // ✅ monthly summary fetch
  useEffect(() => {
    if (!isInitialized) return;

    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      groupBy: 'monthly',
      startDate,
      endDate,
    };
    fetchTransactionSummary(params);
  }, [getDateRangeKey, date]);

  // ✅ 주간 요약 fetch 핸들러
  const handleToggle = useCallback(
    async (index: number, summaryItem: TransactionGroupItemDTO) => {
      const isOpening = openIndex !== index;
      setOpenIndex(isOpening ? index : null);

      const label = summaryItem.label;
      if (!isOpening || weeklySummaryByMonth[label]) return;

      try {
        const monthDate = parse(label, 'yyyy-MM', new Date());
        const startDate = format(startOfMonth(monthDate), 'yyyy-MM-dd');
        const endDate = format(endOfMonth(monthDate), 'yyyy-MM-dd');

        const params: DateFilterParams = {
          groupBy: 'weekly',
          startDate,
          endDate,
        };

        const weeklyRes = await fetchTransactionSummaryWeekly(params);
        const weeklyData: TransactionGroupItemDTO[] = weeklyRes?.items ?? [];

        setWeeklySummaryByMonth((prev) => ({
          ...prev,
          [label]: weeklyData,
        }));
      } catch (err) {
        console.error(`Failed to load weekly summary for ${label}:`, err);
      }
    },
    [openIndex, weeklySummaryByMonth]
  );

  const totalIncome = summary?.totalIncome ?? 0;
  const totalExpense = summary?.totalExpense ?? 0;

  const summaryItems = [
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
      data={summary}
      summaryItems={summaryItems}
      openIndex={openIndex}
      weeklySummaryByMonth={weeklySummaryByMonth}
      onToggle={handleToggle}
    />
  );
}
