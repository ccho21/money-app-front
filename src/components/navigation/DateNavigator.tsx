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
import { MonthPicker } from '../ui/picker/MonthPicker';
import { Timeframe } from '@/modules/transaction/types/types';
import { YearPicker } from '../ui/picker/YearPicker';

interface DateNavigatorProps {
  variant?: Timeframe;
  className?: string;
  onNavigate?: (start: string, end: string) => void;
  showArrows?: boolean;
}

export default function DateNavigator({
  variant = 'monthly',
  className,
  onNavigate,
  showArrows = false,
}: DateNavigatorProps) {
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const { parsedDate, label, handleChange, handleSelect } = useDateNavigator({
    onRangeChange: onNavigate,
  });

  const [selectedYear, setSelectedYear] = useState(parsedDate.getFullYear());

  const NavigationArrows = ({ children }: { children: React.ReactNode }) => (
    <div className={cn('flex items-center gap-2', className)}>
      <Button variant='ghost' onClick={() => handleChange(-1)}>
        <ChevronLeft className='w-5 h-5 text-muted-foreground' />
      </Button>
      {children}
      <Button variant='ghost' onClick={() => handleChange(1)}>
        <ChevronRight className='w-5 h-5 text-muted-foreground' />
      </Button>
    </div>
  );

  // 🔸 MONTHLY VIEW
  if (variant === 'monthly') {
    const monthButton = (
      <Popover open={monthOpen} onOpenChange={setMonthOpen}>
        <PopoverTrigger asChild>
          <Button variant='ghost' className='!p-2 text-sm font-semibold'>
            {label}
            {!showArrows && (
              <ChevronDown className='w-4 h-4 text-muted-foreground' />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align='center' className='w-auto p-0'>
          <MonthPicker
            selectedMonth={parsedDate}
            onMonthSelect={(date) => {
              handleSelect(date);
              setMonthOpen(false);
            }}
            variant={{
              calendar: { main: 'ghost', selected: 'default' },
              chevrons: 'outline',
            }}
          />
        </PopoverContent>
      </Popover>
    );

    return showArrows ? (
      <NavigationArrows>{monthButton}</NavigationArrows>
    ) : (
      <div className={className}>{monthButton}</div>
    );
  }

  // 🔸 YEARLY VIEW
  if (variant === 'yearly') {
    const yearButton = (
      <Popover open={yearOpen} onOpenChange={setYearOpen}>
        <PopoverTrigger asChild>
          <Button variant='ghost' className='!p-2 text-sm font-semibold'>
            {parsedDate.getFullYear()}
            {!showArrows && (
              <ChevronDown className='w-4 h-4 text-muted-foreground' />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='w-auto p-0'>
          <YearPicker
            selectedYear={selectedYear}
            onYearSelect={(year) => {
              setSelectedYear(year);
              handleSelect(new Date(year, 0, 1));
              setYearOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );

    return showArrows ? (
      <NavigationArrows>{yearButton}</NavigationArrows>
    ) : (
      <div className={cn('flex items-center', className)}>{yearButton}</div>
    );
  }

  return null;
}
