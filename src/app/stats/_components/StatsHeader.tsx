'use client';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export type ViewMode = 'Stats' | 'Budget' | 'Note';
const VIEW_MODES: ViewMode[] = ['Stats', 'Budget', 'Note'];

const RANGE_OPTIONS = [
  'Weekly',
  'Monthly',
  'Annually',
  'Period',
  'List',
  'Trend',
] as const;

type RangeOption = (typeof RANGE_OPTIONS)[number];

interface Props {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export default function StatsHeader({ viewMode, setViewMode }: Props) {
  const [range, setRange] = useState<RangeOption>('Monthly');
  const [showRangeModal, setShowRangeModal] = useState(false);

  const today = new Date();
  const monthLabel = format(today, 'MMM yyyy');

  return (
    <div className='p-4 space-y-2'>
      {/* 탭 버튼 + 드롭다운 */}
      <div className='flex justify-between items-center rounded-md bg-gray-100 dark:bg-zinc-800 py-1 px-2'>
        <div className='flex gap-2'>
          {VIEW_MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                'text-sm font-medium px-4 py-1 rounded-md',
                viewMode === mode
                  ? 'bg-white dark:bg-black text-red-500'
                  : 'text-gray-500 dark:text-gray-300'
              )}
            >
              {mode}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowRangeModal(true)}
          className='text-xs border px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
        >
          {range[0]}
        </button>
      </div>

      {/* 모달 */}
      {showRangeModal && (
        <div className='fixed inset-0 bg-opacity-40 flex items-end justify-center z-50'>
          <div className='bg-white dark:bg-zinc-900 w-full max-w-md rounded-t-lg p-4 space-y-2'>
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setRange(option);
                  setShowRangeModal(false);
                }}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-md text-sm',
                  range === option
                    ? 'text-red-500 font-semibold'
                    : 'text-gray-700 dark:text-gray-300'
                )}
              >
                {option}
              </button>
            ))}
            <button
              onClick={() => setShowRangeModal(false)}
              className='w-full text-center text-sm text-gray-500 dark:text-gray-400 mt-2'
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
