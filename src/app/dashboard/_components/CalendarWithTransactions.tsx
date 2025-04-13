// 📄 src/components/ui/CalendarWithTransactions.tsx
'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/custom-calendar.css';

import { formatDate } from '@/lib/date.util';
import { JSX, useMemo } from 'react';
import { useUserSettingStore } from '@/stores/useUserSettingStore';
import { useShallow } from 'zustand/shallow';

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
      onClickDay={onSelectDate}
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
