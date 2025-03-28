'use client';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import BottomSheet from '@/components/ui/BottomSheet';

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

const tabs = [
  { name: 'Stats', href: '/stats' },
  { name: 'Budget', href: '/stats/budget' },
  { name: 'Note', href: '/stats/note' },
];

export default function StatsHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [range, setRange] = useState<(typeof RANGE_OPTIONS)[number]>('Monthly');
  const today = new Date();
  const monthLabel = format(today, 'MMM yyyy');

  return (
    <div className='p-4 space-y-2'>
      {/* 탭 버튼 + 드롭다운 */}
      <div className='flex justify-between items-center rounded-md bg-gray-100 dark:bg-zinc-800 py-1 px-2'>
        <div className='flex gap-2'>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => router.push(tab.href)}
              className={cn(
                'text-sm font-medium px-4 py-1 rounded-md',
                pathname === tab.href
                  ? 'bg-white dark:bg-black text-red-500'
                  : 'text-gray-500 dark:text-gray-300'
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className='text-xs border px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
        >
          {range}
        </button>
      </div>

      <BottomSheet open={showModal} onClose={() => setShowModal(false)}>
        <div className=''>
          <h2 className='pt-4 p-3 text-md font-semibold border-b border-gray-200'>
            Period
          </h2>
          <div className='text-sm'>
            <div className='border-b border-gray-200'>
              <button className='p-3 mt-2'>Weekly</button>
            </div>
            <div className='border-b border-gray-200'>
              <button className='p-3 mt-2'>Monthly</button>
            </div>
            <div className='border-b border-gray-200'>
              <button className='p-3 mt-2'>Yearly</button>
            </div>
            <div className='border-b border-gray-200'>
              <button className='p-3 mt-2'>Period</button>
            </div>
          </div>
        </div>
      </BottomSheet>
      {/* 모달 */}
      {/* {showRangeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-end justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-t-lg p-4 space-y-2">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setRange(option);
                  setShowRangeModal(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm",
                  range === option
                    ? "text-red-500 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                {option}
              </button>
            ))}
            <button
              onClick={() => setShowRangeModal(false)}
              className="w-full text-center text-sm text-gray-500 dark:text-gray-400 mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}
