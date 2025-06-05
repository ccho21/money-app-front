'use client';

import { JSX, useLayoutEffect, useMemo, useState } from 'react';
import { addDays } from 'date-fns';
import dynamic from 'next/dynamic';

import { parseLocalDate } from '@/modules/shared/lib/date.util';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { useTransactionCalendarQuery } from '@/modules/transaction/hooks/queries';

import LoadingMessage from '@/components/ui/custom/loadingMessage';
import { TransactionCalendar } from '@/modules/transaction/types/types';
import DateNavigator from '@/components/navigation/DateNavigator';
import CurrencyDisplay from '@/components/ui/custom/currencyDisplay';

const TransactionCalendarView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionCalendarView'),
  { ssr: false }
);
const TransactionDetailView = dynamic(
  () => import('@/modules/transaction/components/view/TransactionDetailView'),
  { ssr: false }
);

export default function CalendarPage() {
  const { query, initializeListDefaults } = useTransactionFilterStore();
  const { timeframe, startDate, endDate } = query;

  const [selectedDetail, setSelectedDetail] = useState<{
    date: Date;
    open: boolean;
  } | null>(null);

  useLayoutEffect(() => {
    initializeListDefaults();
  }, [initializeListDefaults]);

  const queryParams = { timeframe, startDate, endDate };

  const { data: calendarData, isLoading: calendarLoading } =
    useTransactionCalendarQuery(queryParams);

  const calendarTileMap = useMemo(() => {
    const map = new Map<string, JSX.Element>();
    (calendarData ?? []).forEach((item: TransactionCalendar) => {
      if (item.income <= 0 && item.expense <= 0) return;

      map.set(
        item.date,
        <div className='text-right'>
          {item.income > 0 && (
            <CurrencyDisplay
              amount={item.income}
              type='income'
              iconSize='xxs'
              className='text-caption'
              shortNumber
            />
          )}
          {item.expense > 0 && (
            <CurrencyDisplay
              amount={item.expense}
              type='expense'
              iconSize='xxs'
              className='text-caption'
              shortNumber
            />
          )}
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
        date={parseLocalDate(startDate)}
        tileContentMap={calendarTileMap}
        onSelectDate={handleDateClick}
      />

      {selectedDetail && (
        <TransactionDetailView
          open={selectedDetail.open}
          date={selectedDetail.date}
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
