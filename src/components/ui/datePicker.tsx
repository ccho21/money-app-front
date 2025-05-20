'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components_backup/ui/calendar';
import { Button } from '@/components_backup/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components_backup/ui/popover';
import { cn } from '@/lib/utils';

interface Props {
  value: Date;
  onChange: (date: Date) => void;
}

export default function DatePicker({ value, onChange }: Props) {
  const [localDate, setLocalDate] = useState<Date>(value);

  useEffect(() => {
    setLocalDate(value);
  }, [value]);

  const handleChange = (val: Date | undefined) => {
    if (val) {
      setLocalDate(val);
      onChange(val);
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
