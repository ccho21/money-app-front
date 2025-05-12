'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/custom-calendar.css';

import { formatDate } from '@/lib/date.util';
import { JSX, useMemo } from 'react';
import { useUserSettingStore } from '@/stores/useUserSettingStore';
import { useShallow } from 'zustand/shallow';

interface TransactionCalendarViewProps {
  date: Date;
  tileContentMap: Map<string, JSX.Element>;
  onSelectDate: (date: Date) => void;
}

export default function TransactionCalendarView({
  date,
  tileContentMap,
  onSelectDate,
}: TransactionCalendarViewProps) {
  const { weeklyStartDay } = useUserSettingStore(
    useShallow((s) => ({
      weeklyStartDay: s.weeklyStartDay,
    }))
  );

  const getTileContent = useMemo(() => {
    return ({ date }: { date: Date }) =>
      tileContentMap.get(formatDate(date)) ?? null;
  }, [tileContentMap]);

  const calendarType = weeklyStartDay === 'monday' ? 'iso8601' : 'gregory';

  return (
    <Calendar
      calendarType={calendarType}
      value={date}
      onClickDay={(date, e) => {
        e.currentTarget.blur();
        return onSelectDate(date);
      }}
      showNavigation={false}
      prevLabel={null}
      nextLabel={null}
      prev2Label={null}
      next2Label={null}
      tileDisabled={({ date: tileDate }) =>
        tileDate.getMonth() !== date.getMonth()
      }
      tileContent={getTileContent}
    />
  );
}
