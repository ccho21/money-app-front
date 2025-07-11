'use client';

import { JSX, useLayoutEffect, useMemo, useState } from 'react';
import { addDays } from 'date-fns';
import dynamic from 'next/dynamic';

import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { useTransactionCalendarQuery } from '@/modules/transaction/hooks/queries';

import LoadingMessage from '@/components/ui/message/loadingMessage';
import {
  TransactionCalendar,
  TransactionGroupQuery,
} from '@/modules/transaction/types/types';
import DateNavigator from '@/components/navigation/DateNavigator';
import CurrencyDisplay from '@/components/ui/currency/currencyDisplay';
import { getDateRangeKey as getDateRangeUtil } from '@/modules/shared/util/date.util';

const TransactionCalendarView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionCalendarView'),
  { ssr: false }
);
const TransactionDetailView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionDetailView'),
  { ssr: false }
);

export default function CalendarPage() {
  const { query, setQuery, getDateRangeKey, initializeListDefaults } =
    useTransactionFilterStore();
  const { timeframe } = query;

  const [selectedDetail, setSelectedDetail] = useState<{
    date: Date | undefined;
    open: boolean;
  } | null>(null);

  useLayoutEffect(() => {
    initializeListDefaults();
  }, [initializeListDefaults]);

  const [startDate, endDate] = getDateRangeKey().split('_');

  const queryParams: TransactionGroupQuery = {
    ...query,
    timeframe,
    startDate,
    endDate,
  };

  const { data: calendarData, isLoading: calendarLoading } =
    useTransactionCalendarQuery(queryParams);

  const calendarTileMap = useMemo(() => {
    if (timeframe === 'yearly') {
      const map = new Map<string, { income: number; expense: number }>();
      (calendarData ?? []).forEach((item: TransactionCalendar) => {
        map.set(item.date, {
          income: item.income,
          expense: item.expense,
        });
      });
      return map;
    }

    const map = new Map<string, JSX.Element>();
    (calendarData ?? []).forEach((item: TransactionCalendar) => {
      if (item.income <= 0 && item.expense <= 0) return;

      map.set(
        item.date,
        <div>
          <div className='text-right'>
            {item.income > 0 && (
              <CurrencyDisplay
                amount={item.income}
                type='income'
                iconSize={10}
                className='text-[10px]'
                shortNumber
              />
            )}
          </div>
          <div className='text-right'>
            {item.expense > 0 && (
              <CurrencyDisplay
                amount={item.expense}
                type='expense'
                iconSize={10}
                className='text-destructive text-[10px]'
                shortNumber
              />
            )}
          </div>
        </div>
      );
    });
    return map;
  }, [calendarData, timeframe]);

  const handleDateClick = (clickedDate: Date) => {
    setSelectedDetail({ date: clickedDate, open: true });
  };

  const handleMonthClick = (clickedMonth: Date) => {
    const [start, end] = getDateRangeUtil(clickedMonth, {
      unit: 'monthly',
    }).split('_');

    setQuery((prev) => {
      const patch: Partial<TransactionGroupQuery> = {};
      if (prev.startDate !== start) patch.startDate = start;
      if (prev.endDate !== end) patch.endDate = end;
      if (prev.timeframe !== 'monthly') patch.timeframe = 'monthly';
      return Object.keys(patch).length > 0 ? patch : {};
    });
  };

  if (calendarLoading) return <LoadingMessage />;

  return (
    <>
      <DateNavigator
        showArrows={true}
        variant={timeframe}
        className='justify-between w-full'
      />
      <TransactionCalendarView
        timeframe={timeframe}
        month={new Date(`${query.startDate}T00:00:00`)}
        date={selectedDetail?.date}
        tileContentMap={calendarTileMap}
        onSelectDate={handleDateClick}
        onSelectMonth={handleMonthClick}
      />

      {selectedDetail && (
        <TransactionDetailView
          open={selectedDetail.open}
          date={selectedDetail.date as Date}
          onClose={() => setSelectedDetail(null)}
          onPrev={() =>
            setSelectedDetail((prev) =>
              prev ? { ...prev, date: addDays(prev.date as Date, -1) } : null
            )
          }
          onNext={() =>
            setSelectedDetail((prev) =>
              prev ? { ...prev, date: addDays(prev.date as Date, 1) } : null
            )
          }
        />
      )}
    </>
  );
}
