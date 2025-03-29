// 📄 경로: src/app/dashboard/calendar/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/custom-calendar.css';
import TransactionDetailSheet from './_components/TransactionDetailSheet';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { format, addDays } from 'date-fns';
import { api } from '@/features/shared/api';
import {
  TransactionSummary,
  TransactionSummaryResponse,
} from '@/features/transaction/types';

export default function CalendarPage() {
  const {
    fetchTransactionCalendar,
    transactionCalendarItems,
    transactionSummaryResponse,
    isLoading,
  } = useTransactionStore();
  const { date } = useDateFilterStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTransactionSummary, setSelectedTransactionSummary] =
    useState<TransactionSummary>();
  const [open, setOpen] = useState(false);

  // ✅ 배열 → Map으로 변환
  const calendarMap = useMemo(() => {
    const map = new Map<string, { income: number; expense: number }>();
    transactionCalendarItems?.forEach((item) => {
      map.set(item.date, { income: item.income, expense: item.expense });
    });
    return map;
  }, [transactionCalendarItems]);

  useEffect(() => {
    fetchTransactionCalendar(
      String(date.getFullYear()),
      String(date.getMonth() + 1)
    );
  }, [fetchTransactionCalendar, date]);

  const getDateStr = (date: Date): string => format(date, 'yyyy-MM-dd');

  const handleDateClick = async (date: Date) => {
    const dateStr = getDateStr(date);
    setSelectedDate(date);

    // 1. transactionSummaryResponse 안에 있는지 확인
    const fromStore = transactionSummaryResponse?.data.find(
      (g) => g.label === dateStr
    );

    if (fromStore) {
      setSelectedTransactionSummary(fromStore);
    } else {
      try {
        const params = new URLSearchParams({
          type: 'daily',
          year: String(date.getFullYear()),
          month: String(date.getMonth() + 1),
          day: String(date.getDate()),
        });

        const res = await api<TransactionSummaryResponse>(
          `/transactions/summary?${params.toString()}`,
          { method: 'GET' }
        );

        // ✅ 해당 일자 summary만 local 상태에 저장
        const summary = res.data?.[0];
        if (summary) setSelectedTransactionSummary(summary);
        else setSelectedTransactionSummary(undefined);
      } catch (err) {
        console.error('일간 거래 요약 가져오기 실패', err);
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
        tileDisabled={({ date: tileDate }) => {
          return tileDate.getMonth() !== date.getMonth();
        }}
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

      {/* 상세 내역 Bottom Sheet */}
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
