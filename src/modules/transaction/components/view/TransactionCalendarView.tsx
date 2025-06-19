'use client';

import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';
import { useShallow } from 'zustand/shallow';
import { formatLocalDateString } from '@/modules/shared/util/date.util';

import { Calendar } from '@/components/ui/calendar';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/modules/shared/util/style.utils';
import React from 'react';

interface TransactionCalendarViewProps {
  date?: Date;
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

  const memoizedTileMap = useMemo(() => tileContentMap, [tileContentMap]);

  const CalendarDayButton = React.memo(
    function CalendarDayButton({
      day,
      modifiers,
      content,
      ...props
    }: {
      day: { date: Date };
      modifiers: Record<string, boolean>;
      content?: React.ReactNode;
    } & Omit<React.ComponentProps<typeof Button>, 'content'>) {
      const isSelected =
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle;

      const isToday = new Date().toDateString() === day.date.toDateString();

      return (
        <Button
          {...props}
          variant='ghost'
          size='icon'
          className={cn(
            'flex flex-col justify-start items-center w-full h-full gap-1 rounded-md text-caption min-h-15 pt-2',
            'leading-tight',
            isSelected && 'bg-primary text-primary-foreground',
            isToday && 'border border-primary font-semibold',
            modifiers.outside && 'text-muted-foreground'
          )}
        >
          <span className='text-label'>{day.date.getDate()}</span>
          <div>{content}</div>
        </Button>
      );
    },
    (prev, next) => {
      return (
        prev.day.date.toDateString() === next.day.date.toDateString() &&
        JSON.stringify(prev.modifiers) === JSON.stringify(next.modifiers) &&
        prev.content === next.content
      );
    }
  );

  return (
    <Calendar
      mode='single'
      month={date ?? new Date()}
      selected={date}
      onSelect={(d) => d && onSelectDate(d)}
      weekStartsOn={weeklyStartDay === 'monday' ? 1 : 0}
      showOutsideDays
      className='w-full'
      classNames={{
        month_caption: 'hidden',
        day: 'w-full h-full',
      }}
      components={{
        WeekNumber: () => <></>,
        Chevron: () => <></>,
        DayButton: ({ day, modifiers, ...props }) => {
          const key = formatLocalDateString(day.date);
          const content = memoizedTileMap.get(key);

          return (
            <CalendarDayButton
              day={day}
              modifiers={modifiers}
              content={content}
              {...props}
            />
          );
        },
      }}
    />
  );
}
