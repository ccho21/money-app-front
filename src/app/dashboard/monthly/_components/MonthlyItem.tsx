'use client';

import { TransactionSummary } from '@/features/transaction/types';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { format, startOfMonth, endOfMonth, parse, isValid } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface MonthlyItemProps {
  date: string;
  income: number;
  expense: number;
  open: boolean;
  weeklyData: TransactionSummary[];
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
  const {
    actions: { setDate },
  } = useDateFilterStore.getState();
  // ✅ 날짜 관련 정보 캐싱
  const parsedDate = useMemo(() => {
    try {
      const d = parse(date, 'yyyy-MM', new Date());
      return isValid(d) ? d : null;
    } catch {
      return null;
    }
  }, [date]);

  const label = useMemo(() => {
    return parsedDate ? format(parsedDate, 'MMM') : 'Invalid';
  }, [parsedDate]);

  const start = useMemo(() => {
    return parsedDate ? format(startOfMonth(parsedDate), 'MM-dd') : '??';
  }, [parsedDate]);

  const end = useMemo(() => {
    return parsedDate ? format(endOfMonth(parsedDate), 'MM-dd') : '??';
  }, [parsedDate]);

  const total = useMemo(() => income - expense, [income, expense]);

  if (!parsedDate) return null; // 컴포넌트 자체 렌더 차단

  const handleClick = (e: React.MouseEvent, week: TransactionSummary) => {
    e.stopPropagation();

    setDate(new Date(week.label));
    router.push('/dashboard/daily');
    ///
  };

  return (
    <div className='border-b border-gray-200 dark:border-zinc-800 px-4'>
      {/* 아코디언 헤더 */}
      <button
        onClick={onToggle}
        className='w-full flex justify-between items-center py-3'
      >
        {/* Left: Month Label */}
        <div className='text-left'>
          <div className='text-base font-semibold text-black dark:text-white'>
            {label}
          </div>
          <div className='text-xs text-gray-400 dark:text-gray-500'>
            {start} ~ {end}
          </div>
        </div>

        {/* Right: Income / Expense / Total */}
        <div className='text-right space-y-1'>
          <div className='flex justify-end gap-2 text-sm font-medium'>
            <span className='text-blue-500'>
              ₩{income?.toLocaleString?.() ?? 0}
            </span>
            <span className='text-red-500'>
              ₩{expense?.toLocaleString?.() ?? 0}
            </span>
          </div>
          <div className='text-xs text-gray-400 dark:text-gray-500'>
            Total ₩{total?.toLocaleString?.() ?? 0}
          </div>
        </div>
      </button>

      {/* 아코디언 내용 - 주차별 요약 */}
      {open && weeklyData?.length > 0 && (
        <div className='px-2 pb-3 text-sm text-gray-600 dark:text-gray-400 space-y-2'>
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
                onClick={(e) => handleClick(e, week)}
                key={idx}
                className='flex justify-between border-b border-gray-100 dark:border-zinc-700 pb-1'
              >
                <span className='text-xs text-gray-500'>{rangeLabel}</span>
                <div className='flex gap-2 text-sm'>
                  {week.incomeTotal > 0 && (
                    <span className='text-blue-500'>
                      ₩{week.incomeTotal?.toLocaleString?.() ?? 0}
                    </span>
                  )}
                  {week.expenseTotal > 0 && (
                    <span className='text-red-500'>
                      ₩{week.expenseTotal?.toLocaleString?.() ?? 0}
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
