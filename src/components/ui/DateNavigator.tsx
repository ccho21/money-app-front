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
  mode?: 'year' | 'month'; // ← optional
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
    <div className='flex justify-between items-center px-4 py-2 text-sm font-medium'>
      <div className='flex gap-2 text-gray-500'>
        <button onClick={() => handleChange(mode === 'year' ? -10 : -12)}>
          <ChevronsLeft size={18} />
        </button>
        <button onClick={() => handleChange(-1)}>
          <ChevronLeft size={18} />
        </button>
      </div>

      <span className='text-black dark:text-white'>
        {mode === 'year' ? `${year}` : `${month} ${year}`}
      </span>

      <div className='flex gap-2 text-gray-500'>
        <button onClick={() => handleChange(1)}>
          <ChevronRight size={18} />
        </button>
        <button onClick={() => handleChange(mode === 'year' ? 10 : 12)}>
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
}
