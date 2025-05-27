'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/stores/useFilterStore';
import { getNextDateByRange } from '@/modules/shared/lib/date.util';
import { useShallow } from 'zustand/shallow';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { MonthPicker } from '../ui/custom/MonthPicker';

export default function DateNavigator() {
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

  const handleMonthSelect = useCallback(
    (selected: Date) => {
      setQuery({ date: selected });
      router.replace(getQueryString(true));
      setOpen(false);
    },
    [setQuery, getQueryString, router]
  );

  const handleYearBack = () => {
    const prev = getNextDateByRange(date, -12, groupBy);
    setQuery({ date: prev });
    router.replace(getQueryString(true));
  };

  const handleYearForward = () => {
    const next = getNextDateByRange(date, 12, groupBy);
    setQuery({ date: next });
    router.replace(getQueryString(true));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='w-[160px] justify-between'>
          {format(parsedDate, 'yyyy-MMM')}
          <ChevronDown className='ml-2 h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='center' className='w-auto p-0'>
        <MonthPicker
          selectedMonth={parsedDate}
          onMonthSelect={handleMonthSelect}
          onYearBackward={handleYearBack}
          onYearForward={handleYearForward}
          variant={{
            calendar: {
              main: 'ghost',
              selected: 'default',
            },
            chevrons: 'outline',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
