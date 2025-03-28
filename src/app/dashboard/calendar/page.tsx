// 📄 경로: src/app/dashboard/calendar/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/custom-calendar.css';
import TransactionDetailSheet from './_components/TransactionDetailSheet';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { format, addDays, isSameMonth } from 'date-fns';

export default function CalendarPage() {
  const {
    fetchTransactionCalendar,
    transactionCalendarItems, // <- 이제 이건 SummaryItem[]
    isLoading,
  } = useTransactionStore();

  const { date } = useDateFilterStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  if (isLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  if (!transactionCalendarItems || transactionCalendarItems.length === 0) {
    return <p className='text-center mt-10 text-gray-400'>데이터가 없습니다</p>;
  }

  return (
    <>
      <Calendar
        calendarType='gregory'
        value={selectedDate || new Date()}
        onClickDay={handleDateClick}
        showNavigation={false}
        prevLabel={null}
        nextLabel={null}
        prev2Label={null}
        next2Label={null}
        tileContent={({ date }) => {
          if (!isSameMonth(date, new Date(date.getFullYear(), date.getMonth())))
            return null;

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

      {/* 상세 내역은 지금은 없음 */}
      {selectedDate && (
        <TransactionDetailSheet
          open={open}
          date={selectedDate}
          transactions={[]} // 🔒 상세 내역 없음
          onClose={() => setOpen(false)}
          onPrev={() => setSelectedDate((prev) => prev && addDays(prev, -1))}
          onNext={() => setSelectedDate((prev) => prev && addDays(prev, 1))}
        />
      )}
    </>
  );
}
