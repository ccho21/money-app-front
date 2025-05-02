// src/app/account/[id]/detail/monthly/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { parse, startOfMonth, endOfMonth, format } from 'date-fns';
import { useParams } from 'next/navigation';

import { useFilterStore } from '@/stores/useFilterStore';
import { useShallow } from 'zustand/shallow';

import { fetchTransactionSummaryWeekly } from '@/modules/transaction/hooks';
import { useAccountDetailSummary } from '@/modules/account/hooks';

import MonthlyView from '@/components/dashboard/MonthlyView';
import { TransactionGroupItemDTO } from '@/modules/transaction/types';
import { DateFilterParams, GroupBy } from '@/common/types';

export default function AccountMonthlyPage() {
  const { id: accountId } = useParams();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [weeklySummaryByMonth, setWeeklySummaryByMonth] = useState<{
    [key: string]: TransactionGroupItemDTO[];
  }>({});

  const { summary, isLoading } = useAccountDetailSummary(
    accountId as string,
    'monthly'
  );

  const { query, setQuery } = useFilterStore(
    useShallow((s) => ({
      query: s.query,
      setQuery: s.setQuery,
    }))
  );

  const { groupBy } = query;

  useEffect(() => {
    const expectedGroupBy: GroupBy = 'yearly'; // ❓ 왜 필요한지 명시
    if (groupBy !== expectedGroupBy) {
      setQuery({ groupBy: expectedGroupBy });
    }
  }, [groupBy, setQuery]);

  const handleToggle = useCallback(
    async (index: number, summary: TransactionGroupItemDTO) => {
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
        setWeeklySummaryByMonth((prev) => ({
          ...prev,
          [label]: weeklyRes?.items ?? [],
        }));
      }
    },
    [openIndex, weeklySummaryByMonth]
  );

  const totalIncome = summary?.totalIncome ?? 0;
  const totalExpense = summary?.totalExpense ?? 0;

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
      data={summary}
      summaryItems={items}
      openIndex={openIndex}
      weeklySummaryByMonth={weeklySummaryByMonth}
      onToggle={handleToggle}
    />
  );
}
