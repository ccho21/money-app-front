// 📄 경로: src/components/ui/DateNavigator.tsx
'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useEffect } from 'react';

export default function DateNavigator() {
  const { date, type, setDate } = useDateFilterStore();

  // ✅ 최초 마운트 시점에 오늘 날짜 저장
  useEffect(() => {
    setDate(new Date());
  }, [setDate]);

  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });

  const handleChange = (diff: number) => {
    const newDate = new Date(date);
    if (type === 'yearly') {
      newDate.setFullYear(newDate.getFullYear() + diff);
    } else {
      newDate.setMonth(newDate.getMonth() + diff);
    }

    setDate(newDate);
  };

  return (
    <div className='flex justify-between items-center px-5 py-3 text-base font-normal'>
      {/* 왼쪽 버튼 */}
      <div className='flex gap-3 text-gray-500'>
        <button onClick={() => handleChange(type === 'yearly' ? -10 : -12)}>
          <ChevronsLeft size={20} />
        </button>
        <button onClick={() => handleChange(-1)}>
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* 날짜 텍스트 */}
      <span className='text-base font-medium text-gray-900 dark:text-white'>
        {type === 'yearly' ? `${year}` : `${month} ${year}`}
      </span>

      {/* 오른쪽 버튼 */}
      <div className='flex gap-3 text-gray-500'>
        <button onClick={() => handleChange(1)}>
          <ChevronRight size={20} />
        </button>
        <button onClick={() => handleChange(type === 'yearly' ? 10 : 12)}>
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
}
