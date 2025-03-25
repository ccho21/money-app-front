'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/calendar-overrides.css';

import CalendarTransactionDetail from './_components/CalendarTransactionDetail';
import { useCalendarSummary } from './_components/useCalendarSummary';

export default function CalendarPage() {
  const { monthSummary } = useCalendarSummary('2025-03');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
    <div className="p-0">
      <Calendar
        className="w-full max-w-none border-none"
        onChange={handleDateClick}
        tileContent={({ date }) => {
          const dotColor = getDotColor(date);
          return dotColor ? (
            <div
              className={`w-1.5 h-1.5 rounded-full mx-auto mt-1 ${dotColor}`}
            />
          ) : null;
        }}
        tileClassName="text-xs p-1"
      />

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
