'use client';

import { JSX, useEffect, useMemo, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import { addDays } from 'date-fns';

import 'react-calendar/dist/Calendar.css';
import '@/styles/custom-calendar.css';

import TransactionDetailSheet from './_components/TransactionDetailSheet';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useShallow } from 'zustand/react/shallow';

import { get } from '@/features/shared/api';
import { fetchTransactionCalendar } from '@/services/transactionService';

import {
  TransactionSummary,
  TransactionSummaryResponse,
} from '@/features/transaction/types';
import { getDateRangeKey } from '@/lib/date.util';
import { formatDate } from '@/lib/date.util';

export default function CalendarPage() {
  const { transactionCalendarItems, transactionSummaryResponse, isLoading } =
    useTransactionStore(
      useShallow((s) => ({
        transactionCalendarItems: s.transactionCalendarItems,
        transactionSummaryResponse: s.transactionSummaryResponse,
        isLoading: s.isLoading,
      }))
    );
  const { setTransactionSummaryResponse } = useTransactionStore().actions;

  const {
    state: { date, range },
    actions: { setRange },
  } = useDateFilterStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTransactionSummary, setSelectedTransactionSummary] =
    useState<TransactionSummary>();
  const [open, setOpen] = useState(false);

  const fetchedYearMonthRef = useRef<string | null>(null);

  const calendarTileMap = useMemo(() => {
    const map = new Map<string, JSX.Element>();

    transactionCalendarItems.forEach((item) => {
      const hasIncome = item.income > 0;
      const hasExpense = item.expense > 0;

      if (!hasIncome && !hasExpense) return;

      map.set(
        item.date,
        <div className='text-[10px]'>
          {hasIncome && (
            <div className='text-blue-500'>
              +₩{item.income.toLocaleString()}
            </div>
          )}
          {hasExpense && (
            <div className='text-red-500'>
              -₩{item.expense.toLocaleString()}
            </div>
          )}
        </div>
      );
    });

    return map;
  }, [transactionCalendarItems]);

  // ✅ range 변경 최적화 (이미 monthly이면 호출 안함)
  useEffect(() => {
    if (range !== 'monthly') {
      setRange('monthly');
    }
  }, [range, setRange]);

  // ✅ 이미 호출한 월이면 다시 요청하지 않음
  useEffect(() => {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);
    const currentKey = `${year}-${month}`;
    if (fetchedYearMonthRef.current === currentKey) return;
    const run = async () => {
      console.log('### CALENDAR fetchTransactionSummary');
      await fetchTransactionCalendar(year, month);
      fetchedYearMonthRef.current = currentKey;
    };
    run();
  }, [date]);

  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: 'monthly', amount: 0 }),
    [date]
  );

  const handleDateClick = async (clickedDate: Date) => {
    const dateStr = formatDate(clickedDate);
    setSelectedDate(clickedDate);

    const fromStore = transactionSummaryResponse?.data.find(
      (g) => g.label === dateStr
    );
    if (fromStore) {
      setSelectedTransactionSummary(fromStore);
      setOpen(true);
      return;
    }

    try {
      const [startDate, endDate] = dateRangeKey.split('_');
      const params = new URLSearchParams({
        groupBy: 'daily',
        startDate,
        endDate,
      });

      const res = await get<TransactionSummaryResponse>(
        `/transactions/summary?${params.toString()}`
      );

      const summary = res.data?.find((s) => s.label === dateStr);
      if (summary) {
        if (transactionSummaryResponse) {
          setTransactionSummaryResponse({
            ...transactionSummaryResponse,
            data: [...transactionSummaryResponse.data, summary],
          });
        }
        setSelectedTransactionSummary(summary);
      } else {
        setSelectedTransactionSummary(undefined);
      }
    } catch (err) {
      console.error('❌ 일간 거래 요약 가져오기 실패:', err);
      setSelectedTransactionSummary(undefined);
    }

    setOpen(true);
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  return (
    <>
      <Calendar
        calendarType='gregory'
        value={date}
        onClickDay={handleDateClick}
        showNavigation={false}
        prevLabel={null}
        nextLabel={null}
        prev2Label={null}
        next2Label={null}
        tileDisabled={({ date: tileDate }) =>
          tileDate.getMonth() !== date.getMonth()
        }
        tileContent={({ date }) =>
          calendarTileMap.get(formatDate(date)) ?? null
        }
      />

      {selectedDate && (
        <TransactionDetailSheet
          open={open}
          date={selectedDate}
          transactionSummary={selectedTransactionSummary}
          onClose={() => setOpen(false)}
          onPrev={() => setSelectedDate((prev) => prev && addDays(prev, -1))}
          onNext={() => setSelectedDate((prev) => prev && addDays(prev, 1))}
        />
      )}
    </>
  );
}
