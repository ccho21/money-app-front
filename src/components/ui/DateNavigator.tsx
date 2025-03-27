// 📄 경로: src/components/ui/DateNavigator.tsx
'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

type Props = {
  date: Date;
  onChange: (newDate: Date) => void;
  mode?: 'year' | 'month';
};

export default function DateNavigator({
  date,
  onChange,
  mode = 'month',
}: Props) {
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });

  const handleChange = (diff: number) => {
    const newDate = new Date(date);
    if (mode === 'year') {
      newDate.setFullYear(newDate.getFullYear() + diff);
    } else {
      newDate.setMonth(newDate.getMonth() + diff);
    }
    onChange(newDate);
  };

  return (
    <div className='flex justify-between items-center px-5 py-3 text-base font-normal'>
      {/* 왼쪽 버튼 */}
      <div className='flex gap-3 text-gray-500'>
        <button onClick={() => handleChange(mode === 'year' ? -10 : -12)}>
          <ChevronsLeft size={20} />
        </button>
        <button onClick={() => handleChange(-1)}>
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* 타이틀 */}
      <span className='text-base font-font-medium text-gray-900 dark:text-white'>
        {mode === 'year' ? `${year}` : `${month} ${year}`}
      </span>

      {/* 오른쪽 버튼 */}
      <div className='flex gap-3 text-gray-500'>
        <button onClick={() => handleChange(1)}>
          <ChevronRight size={20} />
        </button>
        <button onClick={() => handleChange(mode === 'year' ? 10 : 12)}>
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
}
