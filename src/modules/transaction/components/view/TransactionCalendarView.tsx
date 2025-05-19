'use client';

import { formatDate } from '@/lib/date.util';
import { useUserSettingStore } from '@/stores/useUserSettingStore';
import { useShallow } from 'zustand/shallow';

import { DayPicker } from 'react-day-picker';
// ❌ 기본 CSS 제거
// import 'react-day-picker/dist/style.css';

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
    <DayPicker
      mode='single'
      month={date}
      selected={date}
      onSelect={(d) => d && onSelectDate(d)}
      weekStartsOn={weeklyStartDay === 'monday' ? 1 : 0}
      showOutsideDays
      classNames={{
        root: 'w-full',
        months: 'flex flex-col gap-4',
        month: 'space-y-2',
        table: 'w-full border-collapse table-fixed',
        head_row: 'flex',
        head_cell: 'w-full text-center text-xs text-muted-foreground',
        row: 'flex',
        cell: 'w-full text-center relative min-h-[70px]',
        day: 'w-full h-full  flex flex-col items-center justify-center text-sm font-normal hover:bg-primary/10 rounded-md',
        day_selected: 'bg-primary text-white',
        day_today: 'border border-primary',
        day_outside: 'text-muted-foreground',
        day_disabled: 'opacity-50 pointer-events-none',
        day_hidden: 'invisible',
      }}
      components={{
        Caption: () => null,
        Day: ({ date }) => {
          const key = formatDate(date);
          const content = tileContentMap.get(key);
          const isSameMonth = date.getMonth() === new Date().getMonth();

          return (
            <button
              onClick={() => onSelectDate(date)} // ✅ 핵심: 직접 호출
              type='button'
              className='w-full h-full relative flex flex-col items-center justify-center rounded-md hover:bg-primary/10 focus:outline-none'
            >
              <span className={isSameMonth ? '' : 'text-muted-foreground'}>
                {date.getDate()}
              </span>
              {content && (
                <div className='absolute bottom-1 right-1 text-[10px] leading-none'>
                  {content}
                </div>
              )}
            </button>
          );
        },
      }}
    />
  );
}
