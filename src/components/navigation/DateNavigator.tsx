'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components_backup/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components_backup/ui/popover';
import { MonthPicker } from '@/components_backup/ui/month-picker/MonthPicker';
import { cn } from '@/lib/utils';
import { useDateNavigator } from '@/modules/transaction/hooks/useDateNavigator';

type Variant = 'dropdown' | 'pager';

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

  const {
    parsedDate,
    label,
    timeframe,
    handleChange,
    handleSelect,
    } = useDateNavigator({ onRangeChange: onNavigate });

  return (
    <div
      className={cn(
        'flex items-end px-component py-tight bg-background',
        className
      )}
    >
      {variant === 'dropdown' && timeframe === 'monthly' ? (
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
              onMonthSelect={(date) => {
                handleSelect(date);
                setOpen(false);
              }}
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
          <Button variant='ghost' onClick={() => handleChange(-1)}>
            <ChevronLeft className='w-5 h-5' />
          </Button>

          <span className='text-body font-semibold text-foreground select-none'>
            {label}
          </span>

          <Button variant='ghost' onClick={() => handleChange(1)}>
            <ChevronRight className='w-5 h-5' />
          </Button>
        </div>
      )}
    </div>
  );
}
