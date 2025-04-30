'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { format, startOfMonth, endOfMonth, parse, isValid } from 'date-fns';

import { TransactionGroupItemDTO } from '@/modules/transaction/types';

import { useFilterStore } from '@/stores/useFilterStore';
import CurrencyDisplay from '../ui/currency/CurrencyDisplay';

interface MonthlyItemProps {
  date: string;
  income: number;
  expense: number;
  open: boolean;
  weeklyData: TransactionGroupItemDTO[];
  onToggle: () => void;
}

export default function MonthlyItem({
  date,
  income,
  expense,
  open,
  weeklyData,
  onToggle,
}: MonthlyItemProps) {
  const router = useRouter();

  const parsedDate = useMemo(() => {
    try {
      const d = parse(date, 'yyyy-MM', new Date());
      return isValid(d) ? d : null;
    } catch {
      return null;
    }
  }, [date]);

  const label = useMemo(
    () => (parsedDate ? format(parsedDate, 'MMM') : 'Invalid'),
    [parsedDate]
  );
  const start = useMemo(
    () => (parsedDate ? format(startOfMonth(parsedDate), 'MM-dd') : '??'),
    [parsedDate]
  );
  const end = useMemo(
    () => (parsedDate ? format(endOfMonth(parsedDate), 'MM-dd') : '??'),
    [parsedDate]
  );

  const total = useMemo(() => income - expense, [income, expense]);

  if (!parsedDate) return null;

  const handleClick = (e: React.MouseEvent, week: TransactionGroupItemDTO) => {
    e.stopPropagation();
    useFilterStore.getState().setQuery({ date: new Date(week.label) });
    router.push('/dashboard/daily');
  };

  return (
    <div className='px-4 border-b border-border transition-colors'>
      {/* 아코디언 헤더 */}
      <button
        onClick={onToggle}
        className='w-full flex justify-between items-center py-3'
      >
        {/* 좌측: 월 정보 */}
        <div className='text-left'>
          <div className='text-md font-semibold text-foreground'>{label}</div>
          <div className='text-xs text-muted'>
            {start} ~ {end}
          </div>
        </div>

        {/* 우측: 수입 / 지출 / 합계 */}
        <div className='text-right space-y-1'>
          <div className='flex justify-end gap-2 text-sm font-medium'>
            <span className='text-info'>
              <CurrencyDisplay amount={income ?? 0} />
            </span>
            <span className='text-error'>
              <CurrencyDisplay amount={expense ?? 0} />
            </span>
          </div>
          <div className='text-xs text-muted'>
            Total <CurrencyDisplay amount={total ?? 0} />
          </div>
        </div>
      </button>

      {/* 아코디언 내용 */}
      {open && weeklyData?.length > 0 && (
        <div className='pl-2 pb-3 space-y-2 text-sm text-muted'>
          {weeklyData.map((week, idx) => {
            const rangeLabel =
              week.rangeStart && week.rangeEnd
                ? `${format(week.rangeStart, 'MM-dd')} - ${format(
                    week.rangeEnd,
                    'MM-dd'
                  )}`
                : '기간 정보 없음';

            return (
              <div
                key={idx}
                onClick={(e) => handleClick(e, week)}
                className='flex justify-between items-center pb-1 hover:bg-muted/10 dark:hover:bg-zinc-800 rounded-sm cursor-pointer transition'
              >
                <span className='text-xs text-muted'>{rangeLabel}</span>
                <div className='flex gap-2 text-sm text-right font-medium'>
                  {week.groupIncome > 0 && (
                    <span className='text-info'>
                      <CurrencyDisplay amount={week.groupIncome ?? 0} />
                    </span>
                  )}
                  {week.groupExpense > 0 && (
                    <span className='text-error'>
                      {' '}
                      <CurrencyDisplay amount={week.groupExpense ?? 0} />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
