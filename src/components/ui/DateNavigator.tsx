// 📄 src/components/ui/DateNavigator.tsx
'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { getNextDateByRange } from '@/lib/dateUtils';

export default function DateNavigator() {
  const {
    state: { date, range },
    actions: { setDate },
  } = useDateFilterStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ 날짜 이동 핸들러 + URL 반영
  const handleChange = (diff: number) => {
    const newDate = getNextDateByRange(date, diff, range);

    setDate(newDate);

    const params = new URLSearchParams(searchParams);
    params.set('date', format(newDate, 'yyyy-MM-dd'));
    router.replace(`?${params.toString()}`);
  };

  // ✅ 날짜 라벨 텍스트
  let label = '';
  switch (range) {
    case 'Yearly':
      label = `${format(date, 'yyyy')}`;
      break;
    case 'Monthly':
      label = format(date, 'MMM yyyy');
      break;
    case 'Weekly': {
      const start = startOfWeek(date, { weekStartsOn: 0 });
      const end = endOfWeek(date, { weekStartsOn: 0 });
      label = `${format(start, 'MMM d')} ~ ${format(end, 'MMM d, yyyy')}`;
      break;
    }
    case 'Daily':
      label = format(date, 'yyyy.MM.dd (EEE)');
      break;
    default:
      label = format(date, 'yyyy.MM.dd');
  }

  return (
    <div className='flex justify-between items-center px-5 py-3 text-base font-normal'>
      {/* 왼쪽 이동 */}
      <div className='flex gap-3 text-gray-500'>
        <button
          onClick={() =>
            handleChange(
              range === 'Yearly' ? -10 : range === 'Monthly' ? -12 : -1
            )
          }
        >
          <ChevronsLeft size={20} />
        </button>
        <button onClick={() => handleChange(-1)}>
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* 라벨 */}
      <span className='text-base font-medium text-gray-900 dark:text-white'>
        {label}
      </span>

      {/* 오른쪽 이동 */}
      <div className='flex gap-3 text-gray-500'>
        <button onClick={() => handleChange(1)}>
          <ChevronRight size={20} />
        </button>
        <button
          onClick={() =>
            handleChange(range === 'Yearly' ? 10 : range === 'Monthly' ? 12 : 1)
          }
        >
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
}
