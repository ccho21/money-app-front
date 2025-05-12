'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import { addDays } from 'date-fns';

import { useFilterStore } from '@/stores/useFilterStore';
import { useTransactionStore } from '@/modules/transaction/store';
import { fetchTransactionCalendar } from '@/modules/transaction/hooks';

import { get } from '@/common/api';
import { formatDate } from '@/lib/date.util';

import type {
  TransactionGroupItemDTO,
  TransactionGroupSummaryDTO,
} from '@/modules/transaction/types';

import CurrencyDisplay from '@/components_backup/ui/currency/CurrencyDisplay';
import { DateFilterParams } from '@/common/types';
import { useShallow } from 'zustand/shallow';
import LoadingMessage from '@/components/ui/custom/loadingMessage';
import dynamic from 'next/dynamic';
import DateNavigator from '@/components/common/DateNavigator';
import TransactionCalendarView from '../components/view/TransactionCalendarView';
const TransactionDetailView = dynamic(
  () => import('@/app/transaction/components/view/TransactionDetailView'),
  {
    ssr: false,
  }
);
export default function CalendarPage() {
  const { calendar, summary, isLoading, setCalendar, setSummary, setLoading } =
    useTransactionStore(
      useShallow((s) => ({
        calendar: s.calendar,
        summary: s.summary,
        isLoading: s.isLoading,
        setCalendar: s.setCalendar,
        setSummary: s.setSummary,
        setLoading: s.setLoading,
      }))
    );

  const { query, setQuery, getDateRangeKey, isInitialized } = useFilterStore();
  const { date, groupBy } = query;

  const [selectedDetail, setSelectedDetail] = useState<{
    date: Date;
    summary?: TransactionGroupItemDTO;
    open: boolean;
  } | null>(null);

  // ✅ 강제 groupBy: 'monthly'
  useEffect(() => {
    if (groupBy !== 'monthly') {
      setQuery({ groupBy: 'monthly' });
    }
  }, [groupBy, setQuery]);

  // ✅ calendar 데이터 fetch
  useEffect(() => {
    if (!isInitialized) return;

    const [startDate, endDate] = getDateRangeKey().split('_');

    const params: DateFilterParams = {
      groupBy: 'daily',
      startDate,
      endDate,
    };
    fetchTransactionCalendar(params);
  }, [date, getDateRangeKey, isInitialized, setCalendar]);

  // ✅ tile 렌더링 구성
  const calendarTileMap = useMemo(() => {
    const map = new Map<string, JSX.Element>();

    calendar.forEach((item) => {
      if (item.income <= 0 && item.expense <= 0) return;

      map.set(
        item.date,
        <div className='text-right'>
          {item.income > 0 && (
            <CurrencyDisplay
              amount={item.income}
              type='income'
              iconSize='xxs'
              className='text-[9px]'
            />
          )}
          {item.expense > 0 && (
            <CurrencyDisplay
              amount={item.expense}
              type='expense'
              iconSize='xxs'
              className='text-[9px]'
            />
          )}
        </div>
      );
    });

    return map;
  }, [calendar]);

  // ✅ 날짜 클릭 → summary 캐시 확인 or API fetch
  const handleDateClick = async (clickedDate: Date) => {
    const dateStr = formatDate(clickedDate);
    const cached = summary?.items?.find((g) => g.label === dateStr);

    if (cached) {
      setSelectedDetail({ date: clickedDate, summary: cached, open: true });
      return;
    }

    try {
      setLoading(true);
      const [startDate, endDate] = getDateRangeKey().split('_');
      const params = new URLSearchParams({
        groupBy: 'daily',
        startDate,
        endDate,
      });

      const res = await get<TransactionGroupSummaryDTO>(
        `/transactions/summary?${params.toString()}`
      );

      const found = res.items?.find((s) => s.label === dateStr);
      if (found) {
        setSummary({
          ...summary!,
          items: [...(summary?.items ?? []), found],
        });
        setSelectedDetail({ date: clickedDate, summary: found, open: true });
      } else {
        setSelectedDetail({
          date: clickedDate,
          summary: undefined,
          open: true,
        });
      }
    } catch (err) {
      console.error('Failed to fetch daily summary:', err);
      setSelectedDetail({ date: clickedDate, summary: undefined, open: true });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingMessage />;
  }

  return (
    <>
      <DateNavigator />
      <TransactionCalendarView
        date={date}
        tileContentMap={calendarTileMap}
        onSelectDate={handleDateClick}
      />

      {selectedDetail && (
        <TransactionDetailView
          open={selectedDetail.open}
          date={selectedDetail.date}
          transactionSummary={selectedDetail.summary}
          onClose={() => setSelectedDetail(null)}
          onPrev={() =>
            setSelectedDetail((prev) =>
              prev ? { ...prev, date: addDays(prev.date, -1) } : null
            )
          }
          onNext={() =>
            setSelectedDetail((prev) =>
              prev ? { ...prev, date: addDays(prev.date, 1) } : null
            )
          }
        />
      )}
    </>
  );
}
