// 📄 src/components/ui/CalendarWithTransactions.tsx
'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/custom-calendar.css';

import { formatDate } from '@/lib/date.util';
import { JSX } from 'react';

interface CalendarWithTransactionsProps {
  date: Date;
  tileContentMap: Map<string, JSX.Element>;
  onSelectDate: (date: Date) => void;
}

export default function CalendarWithTransactions({
  date,
  tileContentMap,
  onSelectDate,
}: CalendarWithTransactionsProps) {
  return (
    <Calendar
      calendarType='gregory'
      value={date}
      onClickDay={onSelectDate}
      showNavigation={false}
      prevLabel={null}
      nextLabel={null}
      prev2Label={null}
      next2Label={null}
      tileDisabled={({ date: tileDate }) =>
        tileDate.getMonth() !== date.getMonth()
      }
      tileContent={({ date }) => {
        return tileContentMap.get(formatDate(date)) ?? null;
      }}
    />
  );
}
