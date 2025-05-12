'use client';

import { useEffect, useState, useCallback } from 'react';
import { parse, startOfMonth, endOfMonth, format, isValid } from 'date-fns';

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
import SummaryBox from '@/components/common/SummaryBox';
import { useSummaryBoxItems } from '@/app/hooks/useSummaryBoxItems';
import DateNavigator from '@/components/common/DateNavigator';
import { useRouter } from 'next/navigation';
const MonthlyView = dynamic(
  () => import('@/components_backup/dashboard/MonthlyView'),
  {
    ssr: false,
  }
);

export default function MonthlyPage() {
  const router = useRouter();

  const { summary, isLoading } = useTransactionStore(
    useShallow((s) => ({
      summary: s.summary,
      isLoading: s.isLoading,
    }))
  );

  const { query, setQuery, getDateRangeKey, isInitialized } = useFilterStore();
  const { groupBy, date } = query;

  useEffect(() => {
    if (groupBy !== 'yearly') {
      setQuery({ groupBy: 'yearly' });
    }
  }, [groupBy, setQuery]);

  useEffect(() => {
    if (!isInitialized) return;

    const [startDate, endDate] = getDateRangeKey().split('_');
    const params: DateFilterParams = {
      groupBy: 'monthly',
      startDate,
      endDate,
    };
    fetchTransactionSummary(params);
  }, [getDateRangeKey, date, isInitialized]);

  const handleMonthClick = useCallback(
    (label: string) => {
      const parsed = parse(`${label}-01`, 'yyyy-MM-dd', new Date());
      if (isValid(parsed)) {
        useFilterStore.getState().setQuery({ date: parsed });
        router.push('');
      }
    },
    [router]
  );

  const summaryItems = useSummaryBoxItems('monthly');

  return (
    <div className='bg-background'>
      <div className='m-compact'>
        <SummaryBox items={summaryItems} />
      </div>
      <DateNavigator />

      <div className='m-compact'>
        <MonthlyView
          isLoading={isLoading}
          data={summary}
          onMonthClick={handleMonthClick}
        />
      </div>
    </div>
  );
}
