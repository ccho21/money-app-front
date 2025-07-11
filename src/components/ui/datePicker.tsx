'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { cn } from '@/modules/shared/util/style.utils';

interface Props {
  isoValue: Date | string;
  onChange: (date: Date) => void;
}

export default function DatePicker({ isoValue, onChange }: Props) {
  const parseToDate = (value: Date | string): Date => {
    return typeof value === 'string' ? new Date(value) : value;
  };

  const [localDate, setLocalDate] = useState<Date>(parseToDate(isoValue));

  useEffect(() => {
    const parsed = parseToDate(isoValue);
    setLocalDate(parsed);
  }, [isoValue]);

  const handleChange = (val: Date | undefined) => {
    if (val) {
      const now = new Date();
      const dateWithCurrentTime = new Date(
        val.getFullYear(),
        val.getMonth(),
        val.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      );

      setLocalDate(dateWithCurrentTime);
      onChange(dateWithCurrentTime);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'justify-start text-left font-normal',
            !localDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {localDate ? (
            format(localDate, 'yyyy-MM-dd (eee)')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={localDate}
          onSelect={handleChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
