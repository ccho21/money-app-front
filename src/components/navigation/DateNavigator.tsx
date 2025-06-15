'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { cn } from '@/modules/shared/util/style.utils';
import { useDateNavigator } from '@/modules/transaction/hooks/useDateNavigator';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { MonthPicker } from '../ui/picker/MonthPicker';

type Variant = 'dropdown' | 'pager' | 'year';

interface DateNavigatorProps {
  variant?: Variant;
  className?: string;
  onNavigate?: (start: string, end: string) => void;
}

export default function DateNavigator({
  variant = 'pager',
  className,
  onNavigate,
}: DateNavigatorProps) {
  const [open, setOpen] = useState(false);
  const { parsedDate, label, handleChange, handleSelect } = useDateNavigator({
    onRangeChange: onNavigate,
  });

  const [selectedYear, setSelectedYear] = useState(
    parsedDate.getFullYear().toString()
  );
  const years = ['2025', '2024', '2023', '2022'];

  if (variant === 'year') {
    return (
      <div className={cn('flex items-center', className)}>
        <Select
          value={selectedYear}
          onValueChange={(year) => {
            setSelectedYear(year);
            handleSelect(new Date(Number(year), 0, 1));
          }}
        >
          <SelectTrigger className='navigator-select-trigger !p-0'>
            {parsedDate.getFullYear()}
          </SelectTrigger>
          <SelectContent align='start'>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='ghost' className='!p-0 text-sm font-semibold'>
            {label}
            <ChevronDown className='w-4 h-4 text-muted-foreground' />
          </Button>
        </PopoverTrigger>
        <PopoverContent align='center' className='w-auto p-0'>
          <MonthPicker
            selectedMonth={parsedDate}
            onMonthSelect={(date) => {
              handleSelect(date);
              setOpen(false);
            }}
            variant={{
              calendar: { main: 'ghost', selected: 'default' },
              chevrons: 'outline',
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }

  // Default: pager
  return (
    <div className={cn('flex items-center justify-between w-full', className)}>
      <Button variant='ghost' onClick={() => handleChange(-1)}>
        <ChevronLeft className='w-5 h-5 text-muted-foreground' />
      </Button>
      <span className='text-label font-semibold text-foreground select-none'>
        {label}
      </span>
      <Button variant='ghost' onClick={() => handleChange(1)}>
        <ChevronRight className='w-5 h-5 text-muted-foreground' />
      </Button>
    </div>
  );
}
