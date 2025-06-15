'use client';

import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';
import { useShallow } from 'zustand/shallow';
import { formatLocalDateString } from '@/modules/shared/util/date.util';

import { Calendar, CalendarDayButton } from '@/components/ui/calendar'; // 커스텀 컴포넌트 import

interface TransactionCalendarViewProps {
  date: Date;
  tileContentMap: Map<string, React.ReactNode>;
  onSelectDate: (date: Date) => void;
}

export default function TransactionCalendarView({
  date,
  tileContentMap,
  onSelectDate,
}: TransactionCalendarViewProps) {
  const { weeklyStartDay } = useUserSettingStore(
    useShallow((s) => ({ weeklyStartDay: s.weeklyStartDay }))
  );

  return (
    <Calendar
      mode='single'
      month={date}
      selected={date}
      onSelect={(d) => d && onSelectDate(d)}
      weekStartsOn={weeklyStartDay === 'monday' ? 1 : 0}
      showOutsideDays
      className='w-full'
      classNames={{
        month_caption: 'hidden',
        day: 'w-full h-full text-label font-normal hover:bg-muted/10 rounded-md',
      }}
      components={{
        WeekNumber: () => <></>,
        DayButton: (props) => {
          const key = formatLocalDateString(props.day.date);
          const content = tileContentMap.get(key);
          const base = CalendarDayButton(props);

          return (
            <div className='relative'>
              {base}
              {content && (
                <div className='text-caption leading-tight text-xs overflow-hidden pointer-events-none'>
                  {content}
                </div>
              )}
            </div>
          );
        },
        Chevron: () => <></>,
      }}
    />
  );
}
