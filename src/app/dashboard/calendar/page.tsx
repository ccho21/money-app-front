// /src/app/dashboard/calendar/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import '@/styles/calendar-overrides.css';
import CalendarTransactionDetail from '../_components/CalendarTransactionDetail';

type Summary = {
  date: string;
  income: number;
  expense: number;
};

export default function CalendarPage() {
  const [monthSummary, setMonthSummary] = useState<Summary[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 📌 캘린더에 표시할 월별 수입/지출 요약 정보 fetch
  useEffect(() => {
    const fetch = async () => {
      const res = await api<Summary[]>('/transactions/calendar?month=2025-03');
      setMonthSummary(res);
    };
    fetch();
  }, []);

  // 📌 날짜별 ● 색상 결정 (수입=초록, 지출=빨강)
  const getDotColor = (date: Date) => {
    const d = format(date, 'yyyy-MM-dd');
    const item = monthSummary.find((s) => s.date === d);
    if (!item) return null;
    if (item.expense > 0) return 'bg-red-500';
    if (item.income > 0) return 'bg-green-500';
    return null;
  };

  const handleDateClick = (value: Date) => {
    setSelectedDate(value);
    setIsDetailOpen(true);
  };

  const handleClose = () => {
    setIsDetailOpen(false);
    setSelectedDate(null);
  };

  return (
    <div className='p-0'>
      {/* 📆 캘린더 본체 */}
      <Calendar
        className='w-full max-w-none border-none'
        onChange={handleDateClick}
        tileContent={({ date }) => {
          const dotColor = getDotColor(date);
          return dotColor ? (
            <div
              className={`w-1.5 h-1.5 rounded-full mx-auto mt-1 ${dotColor}`}
            />
          ) : null;
        }}
        tileClassName='text-xs p-1'
      />

      {/* 📌 슬라이드업 거래 내역 모달 */}
      {selectedDate && (
        <CalendarTransactionDetail
          date={format(selectedDate, 'yyyy-MM-dd')}
          isOpen={isDetailOpen}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
