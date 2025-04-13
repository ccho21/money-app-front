'use client';

import { format, parse, isValid, startOfYear, endOfYear } from 'date-fns';
import { useMemo } from 'react';

interface YearlyItemProps {
  date: string;
  income: number;
  expense: number;
  onClick: () => void;
}

export default function YearlyItem({
  date,
  income,
  expense,
  onClick,
}: YearlyItemProps) {
  const parsedDate = useMemo(() => {
    try {
      const d = parse(date, 'yyyy', new Date());
      return isValid(d) ? d : null;
    } catch {
      return null;
    }
  }, [date]);

  const label = parsedDate ? format(parsedDate, 'yyyy') : 'Invalid';
  const start = parsedDate ? format(startOfYear(parsedDate), 'MM-dd') : '??';
  const end = parsedDate ? format(endOfYear(parsedDate), 'MM-dd') : '??';
  const total = income - expense;

  if (!parsedDate) return null;

  return (
    <div className='border-b border-border bg-surface text-foreground px-4'>
      <button
        onClick={onClick}
        className='w-full flex justify-between items-center py-3'
      >
        {/* 좌측: 연도 + 범위 */}
        <div className='text-left'>
          <div className='text-md font-semibold text-foreground'>{label}</div>
          <div className='text-xs text-muted-foreground'>
            {start} ~ {end}
          </div>
        </div>

        {/* 우측: 수입/지출/합계 */}
        <div className='text-right space-y-1'>
          <div className='flex justify-end gap-2 text-sm font-medium'>
            <span className='text-info'>${income.toLocaleString()}</span>
            <span className='text-error'>${expense.toLocaleString()}</span>
          </div>
          <div className='text-xs text-muted-foreground'>
            Total ${total.toLocaleString()}
          </div>
        </div>
      </button>
    </div>
  );
}
