'use client';

import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';
import { useShallow } from 'zustand/shallow';
import { formatLocalDateString } from '@/modules/shared/util/date.util';

import { Calendar } from '@/components/ui/calendar';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/modules/shared/util/style.utils';
import React from 'react';
import { Timeframe } from '../../types/types';
import CurrencyDisplay from '@/components/ui/currency/currencyDisplay';
import { format } from 'date-fns';

interface TransactionCalendarViewProps {
  month: Date;
  date?: Date;
  tileContentMap: Map<
    string,
    | React.ReactNode
    | {
        income: number;
        expense: number;
      }
  >;
  timeframe: Timeframe;
  onSelectDate: (date: Date) => void;
  onSelectMonth: (date: Date) => void;
}

export default function TransactionCalendarView({
  date,
  month,
  tileContentMap,
  onSelectDate,
  onSelectMonth,
  timeframe,
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

  // 🔹 yearly 모드일 경우 월 버튼 UI
  if (timeframe === 'yearly') {
    return (
      <div className='space-y-2'>
        {Array.from({ length: 12 }, (_, i) => {
          const currentMonthDate = new Date(month.getFullYear(), i, 1);
          const key = format(currentMonthDate, 'yyyy-MM');
          const content = memoizedTileMap.get(key) as
            | {
                income: number;
                expense: number;
              }
            | undefined;

          const isSelected =
            date?.getFullYear() === currentMonthDate.getFullYear() &&
            date?.getMonth() === i;

          return (
            <button
              key={key}
              onClick={() => onSelectMonth(currentMonthDate)}
              className={cn(
                'w-full p-3 rounded-lg border text-left flex justify-between items-center hover:bg-accent transition-all',
                isSelected && 'bg-primary text-white'
              )}
            >
              <div>
                <div className='text-sm font-semibold'>
                  {format(currentMonthDate, 'MMM')}
                </div>
                <div className='text-xs text-muted-foreground'>
                  {format(currentMonthDate, 'MM-01')} ~{' '}
                  {format(
                    new Date(currentMonthDate.getFullYear(), i + 1, 0),
                    'MM-dd'
                  )}
                </div>
              </div>
              <div className='text-right space-y-1 text-sm'>
                <CurrencyDisplay
                  amount={content?.expense ?? 0}
                  type='expense'
                  className='text-destructive text-sm'
                  shortNumber
                />
                <CurrencyDisplay
                  amount={content?.income ?? 0}
                  type='income'
                  className='text-green-600 text-sm'
                  shortNumber
                />
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <Calendar
      mode='single'
      month={month ?? new Date()}
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
              content={content as React.ReactNode}
              {...props}
            />
          );
        },
      }}
    />
  );
}
