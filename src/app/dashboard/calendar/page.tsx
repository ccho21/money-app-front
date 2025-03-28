// 📄 경로: src/app/dashboard/calendar/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/custom-calendar.css';
import TransactionDetailSheet from './_components/TransactionDetailSheet';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useTransactionStore } from '@/stores/useTransactionStore';

export default function CalendarPage() {
  const { fetchTransactionCalendar, transactionCalendarItems, isLoading } =
    useTransactionStore();

  const { date } = useDateFilterStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTransactionCalendar(
      String(date.getFullYear()),
      String(date.getMonth() + 1)
    );
  }, [fetchTransactionCalendar, date]);

  const getDateStr = (date: Date) => date.toISOString().split('T')[0];

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  // ✅ 요약 수치 계산 (수입/지출 총합)
  const { income, expense } = useMemo(() => {
    const all = Object.values(transactionCalendarItems ?? {}).flat();
    const income = all
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = all
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense };
  }, [transactionCalendarItems]);

  if (isLoading) {
    return <p className='text-center mt-10 text-gray-500'>불러오는 중...</p>;
  }

  if (!transactionCalendarItems) {
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
        className=''
        tileContent={({ date }) => {
          const key = getDateStr(date);
          const transactions = transactionCalendarItems?.[key];
          if (!transactions || transactions.length === 0) return null;

          const total = transactions.reduce((sum, t) => sum + t.amount, 0);
          const isExpense = total < 0;

          return (
            <div className='text-[10px]'>
              <span className={isExpense ? 'text-red-500' : 'text-blue-500'}>
                ₩{Math.abs(total).toLocaleString()}
              </span>
            </div>
          );
        }}
      />

      {/* Modal Sheet */}
      {selectedDate && (
        <TransactionDetailSheet
          open={open}
          date={selectedDate}
          transactions={
            transactionCalendarItems[getDateStr(selectedDate)] || []
          }
          onClose={() => setOpen(false)}
          onPrev={() =>
            setSelectedDate(
              (prev) =>
                new Date(
                  prev!.getFullYear(),
                  prev!.getMonth(),
                  prev!.getDate() - 1
                )
            )
          }
          onNext={() =>
            setSelectedDate(
              (prev) =>
                new Date(
                  prev!.getFullYear(),
                  prev!.getMonth(),
                  prev!.getDate() + 1
                )
            )
          }
        />
      )}
    </>
  );
}
