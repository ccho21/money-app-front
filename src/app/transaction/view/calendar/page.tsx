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

const TransactionCalendarView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionCalendarView'),
  { ssr: false }
);
const TransactionDetailView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionDetailView'),
  { ssr: false }
);

export default function CalendarPage() {
  const { query, getDateRangeKey, initializeListDefaults } =
    useTransactionFilterStore();
  const { timeframe } = query;

  const [selectedDetail, setSelectedDetail] = useState<{
    date: Date | undefined;
    open: boolean;
  } | null>(null);

  useLayoutEffect(() => {
    console.log('%c[CalendarPage] render', 'color: limegreen');

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
  }, [calendarData]);

  const handleDateClick = (clickedDate: Date) => {
    setSelectedDetail({ date: clickedDate, open: true });
  };

  if (calendarLoading) return <LoadingMessage />;

  return (
    <>
      <DateNavigator />
      <TransactionCalendarView
        date={selectedDetail?.date}
        tileContentMap={calendarTileMap}
        onSelectDate={handleDateClick}
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
