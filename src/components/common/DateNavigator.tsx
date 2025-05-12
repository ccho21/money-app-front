'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/stores/useFilterStore';
import { useShallow } from 'zustand/shallow';
import { startOfWeek, endOfWeek, format } from 'date-fns';

import { getNextDateByRange } from '@/lib/date.util';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components_backup/ui/popover';
import { Button } from '@/components_backup/ui/button';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { MonthPicker } from '@/components_backup/ui/month-picker/MonthPicker';
import { cn } from '@/lib/utils';

type Variant = 'dropdown' | 'pager';

interface DateNavigatorProps {
  variant?: Variant;
  className?: string;
}

export default function DateNavigator({
  variant = 'pager',
  className,
}: DateNavigatorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { date, groupBy } = useFilterStore(
    useShallow((s) => ({
      date: s.query.date,
      groupBy: s.query.groupBy,
    }))
  );

  const setQuery = useFilterStore((s) => s.setQuery);
  const getQueryString = useFilterStore((s) => s.getQueryString);

  const parsedDate = useMemo(() => {
    return date ? new Date(date) : new Date();
  }, [date]);

  const label = useMemo(() => {
    switch (groupBy) {
      case 'daily':
        return format(parsedDate, 'yyyy-MM-dd');
      case 'weekly': {
        const start = startOfWeek(parsedDate, { weekStartsOn: 1 });
        const end = endOfWeek(parsedDate, { weekStartsOn: 1 });
        return `${format(start, 'yyyy-MM-dd')} ~ ${format(end, 'yyyy-MM-dd')}`;
      }
      case 'monthly':
      default:
        return format(parsedDate, 'yyyy-MMM');
    }
  }, [parsedDate, groupBy]);

  const handleChange = useCallback(
    (diff: number) => {
      const newDate = getNextDateByRange(date, diff, groupBy);
      setQuery({ date: newDate });
      router.replace(getQueryString(true));
    },
    [date, groupBy, setQuery, getQueryString, router]
  );

  const handleMonthSelect = useCallback(
    (selected: Date) => {
      setQuery({ date: selected });
      router.replace(getQueryString(true));
      setOpen(false);
    },
    [setQuery, getQueryString, router]
  );

  return (
    <div className={cn('flex items-center px-component py-tight bg-background', className)}>
      {variant === 'dropdown' && groupBy === 'monthly' ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' className='gap-1 px-3 py-1.5'>
              {label}
              <ChevronDown className='w-4 h-4' />
            </Button>
          </PopoverTrigger>
          <PopoverContent align='center' className='w-auto p-0'>
            <MonthPicker
              selectedMonth={parsedDate}
              onMonthSelect={handleMonthSelect}
              onYearBackward={() => handleChange(-12)}
              onYearForward={() => handleChange(12)}
              variant={{
                calendar: { main: 'ghost', selected: 'default' },
                chevrons: 'outline',
              }}
            />
          </PopoverContent>
        </Popover>
      ) : (
        <div className='flex items-center justify-between w-full'>
          <Button variant='ghost' onClick={() => handleChange(-1)} aria-label='Previous'>
            <ChevronLeft className='w-5 h-5' />
          </Button>

          <span className='text-body font-semibold text-foreground select-none'>
            {label}
          </span>

          <Button variant='ghost' onClick={() => handleChange(1)} aria-label='Next'>
            <ChevronRight className='w-5 h-5' />
          </Button>
        </div>
      )}
    </div>
  );
}
