'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/modules/shared/util/style.utils';
import { useState } from 'react';
import { buttonVariants } from '../button';

interface YearPickerProps {
  selectedYear?: number;
  onYearSelect?: (year: number) => void;
  minYear?: number;
  maxYear?: number;
  variant?: {
    calendar?: {
      main?: ButtonVariant;
      selected?: ButtonVariant;
    };
    chevrons?: ButtonVariant;
  };
  className?: string;
}

type ButtonVariant =
  | 'default'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive'
  | 'secondary'
  | null
  | undefined;

const VISIBLE_ROWS = 3;
const YEARS_PER_ROW = 3;
const YEARS_PER_PAGE = VISIBLE_ROWS * YEARS_PER_ROW;

function YearPicker({
  selectedYear,
  onYearSelect,
  minYear = 2010,
  maxYear = new Date().getFullYear(),
  variant,
  className,
}: YearPickerProps) {
  const initialPageStart =
    selectedYear && selectedYear >= minYear && selectedYear <= maxYear
      ? selectedYear - (selectedYear % YEARS_PER_PAGE)
      : maxYear - (maxYear % YEARS_PER_PAGE);

  const [startYear, setStartYear] = useState(initialPageStart);

  const years = Array.from(
    { length: YEARS_PER_PAGE },
    (_, i) => startYear + i
  ).filter((year) => year <= maxYear);

  const handlePrev = () => setStartYear((prev) => prev - YEARS_PER_PAGE);
  const handleNext = () => {
    const nextStartYear = startYear + YEARS_PER_PAGE;

    // 다음 페이지의 첫 해가 maxYear를 초과하면 이동 금지
    if (nextStartYear > maxYear) return;

    setStartYear(nextStartYear);
  };

  return (
    <div className={cn('min-w-[200px] w-[280px] p-3', className)}>
      <div className='flex justify-center pt-1 relative items-center'>
        <div className='text-sm font-medium'>{`${startYear} - ${
          startYear + YEARS_PER_PAGE - 1
        }`}</div>
        <div className='space-x-1 flex items-center'>
          <button
            onClick={handlePrev}
            className={cn(
              buttonVariants({ variant: variant?.chevrons ?? 'outline' }),
              'inline-flex items-center justify-center h-7 w-7 p-0 absolute left-1'
            )}
          >
            <ChevronLeft className='opacity-50 h-4 w-4' />
          </button>
          <button
            onClick={handleNext}
            disabled={startYear + YEARS_PER_PAGE > maxYear}
            className={cn(
              buttonVariants({ variant: variant?.chevrons ?? 'outline' }),
              'inline-flex items-center justify-center h-7 w-7 p-0 absolute right-1',
              startYear + YEARS_PER_PAGE > maxYear &&
                'opacity-40 cursor-not-allowed'
            )}
          >
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </div>

      <table className='w-full border-collapse mt-3'>
        <tbody>
          {Array.from({ length: VISIBLE_ROWS }, (_, rowIndex) => (
            <tr key={`row-${rowIndex}`} className='flex w-full'>
              {years
                .slice(rowIndex * YEARS_PER_ROW, (rowIndex + 1) * YEARS_PER_ROW)
                .map((year) => (
                  <td key={year} className='w-1/3 p-1'>
                    <button
                      onClick={() => onYearSelect?.(year)}
                      disabled={year < minYear || year > maxYear}
                      className={cn(
                        buttonVariants({
                          variant:
                            year === selectedYear
                              ? variant?.calendar?.selected ?? 'default'
                              : variant?.calendar?.main ?? 'ghost',
                        }),
                        'w-full'
                      )}
                    >
                      {year}
                    </button>
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

YearPicker.displayName = 'YearPicker';

export { YearPicker };
