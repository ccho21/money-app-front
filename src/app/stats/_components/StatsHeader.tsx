'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import BottomSheetPanel from '@/components/ui/BottomSheetPanel';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { RANGE_OPTIONS, RangeOption } from '@/features/shared/types';

const tabs = [
  { name: 'Stats', href: '/stats/category' },
  { name: 'Budget', href: '/stats/budget' },
  // { name: "Note", href: "/stats/note" },
];

export default function StatsHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showModal, setShowModal] = useState(false);

  const {
    state: { range },
    actions: { setRange, getSyncedURLFromState },
  } = useDateFilterStore();

  // ✅ URL의 range 쿼리 → store 동기화
  useEffect(() => {
    const urlRange = searchParams.get('range') as RangeOption | null;
    if (urlRange && urlRange !== range) {
      setRange(urlRange);
    }
  }, [searchParams, range, setRange]);

  // ✅ URLSearchParams 변경 핸들러
  const updateRange = (newRange: RangeOption) => {
    setRange(newRange);
    const syncedURL = getSyncedURLFromState();
    router.replace(`?${syncedURL}`);
    setShowModal(false);
  };

  return (
    <div className='p-2'>
      {/* 탭 버튼 + 드롭다운 */}
      <div className='flex justify-between items-center rounded-md bg-gray-100 dark:bg-zinc-800 py-1 px-2'>
        <div className='flex gap-2'>
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);

            return (
              <button
                key={tab.name}
                onClick={() => router.push(tab.href)}
                className={cn(
                  'text-sm font-medium px-4 py-1 rounded-md',
                  isActive
                    ? 'bg-white dark:bg-black text-red-500'
                    : 'text-gray-500 dark:text-gray-300'
                )}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className='text-xs border px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
        >
          {range}
        </button>
      </div>

      {/* 하단 모달: 기간 옵션 선택 */}
      <BottomSheetPanel isOpen={showModal} onClose={() => setShowModal(false)}>
        <div>
          <div className='text-sm divide-y border-b border-gray-200 dark:border-zinc-700'>
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option}
                className={cn(
                  'p-3 w-full text-left',
                  option === range
                    ? 'bg-gray-100 dark:bg-zinc-800 font-semibold'
                    : ''
                )}
                onClick={() => updateRange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </BottomSheetPanel>
    </div>
  );
}
