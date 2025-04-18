// 📄 경로: src/app/stats/_components/StatsHeader.tsx
'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import BottomSheetPanel from '@/components/ui/BottomSheetPanel';
import { useFilterStore } from '@/stores/useFilterStore';

import { RANGE_OPTIONS, RangeOption } from '@/features/shared/types';

const tabs = [
  { name: 'Stats', href: '/stats/category' },
  { name: 'Budget', href: '/stats/budget' },
  { name: 'Note', href: '/stats/note' },
];

export default function StatsHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const { query, setQuery, getQueryString } = useFilterStore();
  const { groupBy } = query;

  const handleRangeSelect = (newRange: RangeOption) => {
    setQuery({ groupBy: newRange });
    const syncedURL = getQueryString(true); // ✅ type 포함
    router.replace(syncedURL);
    setShowModal(false);
  };

  const handleTabChange = (segment: '/stats/category' | '/stats/budget') => {
    const search = window.location.search;
    const newPath = `${segment}${search}`;
    router.replace(newPath);
  };

  return (
    <div className='p-2'>
      <div className='flex justify-between items-center rounded-md bg-surface py-1 px-2'>
        <div className='flex gap-2'>
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);

            return (
              <button
                key={tab.name}
                onClick={() =>
                  handleTabChange(
                    tab.href as '/stats/category' | '/stats/budget'
                  )
                }
                className={cn(
                  'text-sm font-medium px-4 py-1 rounded-md transition-all',
                  isActive
                    ? 'bg-background text-primary'
                    : 'text-muted hover:text-foreground'
                )}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className='text-xs border px-2 py-1 rounded-md text-muted border-border hover:text-foreground'
        >
          {groupBy}
        </button>
      </div>

      {/* 하단 모달: 기간 옵션 선택 */}
      <BottomSheetPanel isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className='text-sm p-2 space-y-1 pb-[10vh]'>
          {RANGE_OPTIONS.map((option) => {
            const isSelected = option === groupBy;

            return (
              <button
                key={option}
                onClick={() => handleRangeSelect(option)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 transition-colors text-left',
                  'border border-border',
                  isSelected
                    ? 'bg-[color:var(--color-surface)] font-semibold text-foreground'
                    : 'hover:bg-[color:var(--color-border)] text-muted hover:text-foreground',
                  'rounded-[2px]' // ✅ 아주 최소한의 라운드
                )}
              >
                <span>{option}</span>
                {isSelected && (
                  <svg
                    className='w-4 h-4 text-primary'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path d='M5 13l4 4L19 7' />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </BottomSheetPanel>
    </div>
  );
}
