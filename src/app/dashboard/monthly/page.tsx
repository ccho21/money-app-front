'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { parse, startOfMonth, endOfMonth, format } from 'date-fns';

import MonthlyItem from './_components/MonthlyItem';
import TransactionSummaryBox from '../_components/TransactionSummaryBox';

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
import EmptyMessage from '@/components/ui/EmptyMessage';
import Panel from '@/components/ui/Panel';
import SummaryBox from '@/components/ui/SummaryBox';

export default function MonthlyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [weeklySummaryByMonth, setWeeklySummaryByMonth] = useState<{
    [key: string]: TransactionSummary[];
  }>({});

  // ✅ shallow 최적화된 상태 선택
  const { transactionSummaryResponse, isLoading } = useTransactionStore(
    useShallow((s) => ({
      transactionSummaryResponse: s.transactionSummaryResponse,
      isLoading: s.isLoading,
    }))
  );

  // ✅ date, range, setRange 선택적으로 구독
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
      setRange('yearly'); // 최초 한 번만 변경
    } else {
      fetchTransactionSummary(params);
    }
  }, [dateRangeKey, range, setRange]);

  const monthlyData = transactionSummaryResponse?.data || [];

  // ✅ 월별 항목 toggle + weekly 데이터 요청
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

  if (isLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  if (!transactionSummaryResponse || !transactionSummaryResponse.data.length) {
    return <EmptyMessage />;
  }
  return (
    <>
      <Panel>
        <SummaryBox
          items={[
            {
              label: 'Income',
              value: transactionSummaryResponse.incomeTotal,
              color:
                transactionSummaryResponse.incomeTotal > 0
                  ? 'text-[#3C50E0]'
                  : 'text-gray-400',
              prefix: '$',
            },
            {
              label: 'Exp.',
              value: transactionSummaryResponse.expenseTotal,
              color:
                transactionSummaryResponse.expenseTotal > 0
                  ? 'text-[#fb5c4c]'
                  : 'text-gray-400',
              prefix: '$',
            },
            {
              label: 'Total',
              value:
                transactionSummaryResponse.incomeTotal -
                transactionSummaryResponse.expenseTotal,
              color: 'text-gray-900 dark:text-white',
              prefix: '$',
            },
          ]}
        />
      </Panel>
      <Panel>
        {monthlyData.map((summary, index) => (
          <MonthlyItem
            key={summary.label}
            date={summary.label}
            income={summary.incomeTotal}
            expense={summary.expenseTotal}
            open={openIndex === index}
            onToggle={() => handleToggle(index, summary)}
            weeklyData={
              openIndex === index && weeklySummaryByMonth[summary.label]
                ? weeklySummaryByMonth[summary.label]
                : []
            }
          />
        ))}
      </Panel>
    </>
  );
}
