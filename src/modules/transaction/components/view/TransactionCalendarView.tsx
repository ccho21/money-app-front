'use client';

import { formatDate } from '@/modules/shared/lib/date.util';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';
import { useShallow } from 'zustand/shallow';

import { DayPicker } from 'react-day-picker';

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
        months: 'flex flex-col gap-spacing-component',
        month: 'space-y-element',
        table: 'w-full border-collapse table-fixed',
        head_row: 'flex',
        head_cell: 'w-full text-center text-body text-muted-foreground',
        row: 'flex',
        cell: 'w-full text-center relative min-h-[4.375rem]', // 70px → tokenized if needed
        day: 'w-full h-full flex flex-col items-center justify-center text-label font-normal hover:bg-muted/10 rounded-md',
        day_selected: 'bg-primary text-primary-foreground',
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
              onClick={() => onSelectDate(date)}
              type='button'
              aria-pressed={false}
              className='w-full h-full relative flex flex-col items-center justify-center rounded-md hover:bg-muted/10 focus:outline-none'
            >
              <span className={isSameMonth ? 'text-label' : 'text-caption text-muted-foreground'}>
                {date.getDate()}
              </span>
              {content && (
                <div className='absolute bottom-tight right-tight text-caption leading-none'>
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
