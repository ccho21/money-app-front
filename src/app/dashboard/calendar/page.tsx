'use client';

import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/custom-calendar.css';

import TransactionDetailSheet from './_components/TransactionDetailSheet';

import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useTransactionStore } from '@/stores/useTransactionStore';

import { format, addDays } from 'date-fns';
import { get } from '@/features/shared/api';
import { fetchTransactionCalendar } from '@/services/transactionService';

import {
  TransactionSummary,
  TransactionSummaryResponse,
} from '@/features/transaction/types';
import { getDateRangeKey } from '@/lib/dateUtils';

export default function CalendarPage() {
  const {
    state: { transactionCalendarItems, transactionSummaryResponse, isLoading },
  } = useTransactionStore();
  const {
    state: { date },
    actions: { setRange },
  } = useDateFilterStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTransactionSummary, setSelectedTransactionSummary] =
    useState<TransactionSummary>();
  const [open, setOpen] = useState(false);

  const calendarMap = useMemo(() => {
    return new Map(
      transactionCalendarItems?.map((item) => [
        item.date,
        { income: item.income, expense: item.expense },
      ])
    );
  }, [transactionCalendarItems]);

  useEffect(() => {
    setRange('Monthly');

    fetchTransactionCalendar(
      String(date.getFullYear()),
      String(date.getMonth() + 1)
    );
  }, [date]);

  const getDateStr = (d: Date) => format(d, 'yyyy-MM-dd');
  const dateRangeKey = useMemo(
    () => getDateRangeKey(date, { unit: 'month', amount: 0 }),
    [date]
  );

  const handleDateClick = async (clickedDate: Date) => {
    const dateStr = getDateStr(clickedDate);
    setSelectedDate(clickedDate);

    const fromStore = transactionSummaryResponse?.data.find(
      (g) => g.label === dateStr
    );

    if (fromStore) {
      setSelectedTransactionSummary(fromStore);
    } else {
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
        setSelectedTransactionSummary(summary);
      } catch (err) {
        console.error('❌ 일간 거래 요약 가져오기 실패:', err);
        setSelectedTransactionSummary(undefined);
      }
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
        tileContent={({ date }) => {
          const key = getDateStr(date);
          const summary = calendarMap.get(key);

          if (!summary) return null;

          return (
            <div className='text-[10px]'>
              {summary.income > 0 && (
                <div className='text-blue-500'>
                  +₩{summary.income.toLocaleString()}
                </div>
              )}
              {summary.expense > 0 && (
                <div className='text-red-500'>
                  -₩{summary.expense.toLocaleString()}
                </div>
              )}
            </div>
          );
        }}
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
