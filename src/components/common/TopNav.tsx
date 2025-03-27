// 📄 경로: src/components/common/TopNav.tsx
'use client';

import { ReactNode } from 'react';
import { ArrowLeft, Filter, Search } from 'lucide-react';

interface TopNavProps {
  title: string;
  center?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onBack?: () => void;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  showSearchButton?: boolean;
  showFilterButton?: boolean;
}

export default function TopNav({
  title,
  center = true,
  leftSlot,
  rightSlot,
  onBack,
  onSearchClick,
  onFilterClick,
  showSearchButton = false,
  showFilterButton = false,
}: TopNavProps) {
  return (
    <div className='relative flex items-center justify-between px-5 py-5 border-b border-gray-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm'>
      {/* 왼쪽 영역 */}
      <div className='flex items-center gap-3 z-10'>
        {onBack && (
          <button
            onClick={onBack}
            className='p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors'
          >
            <ArrowLeft className='w-5 h-5' />
          </button>
        )}
        {leftSlot}
      </div>

      {/* 타이틀 */}
      {center ? (
        <div className='absolute inset-0 flex justify-center items-center pointer-events-none'>
          <h1 className='text-xl font-semibold text-gray-900 dark:text-white'>
            {title}
          </h1>
        </div>
      ) : (
        <h1 className='text-xl font-semibold text-gray-900 dark:text-white'>
          {title}
        </h1>
      )}

      {/* 오른쪽 영역 */}
      <div className='flex items-center gap-3 z-10'>
        {showSearchButton && (
          <button
            onClick={onSearchClick}
            className='p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors'
          >
            <Search className='w-5 h-5' />
          </button>
        )}
        {showFilterButton && (
          <button
            onClick={onFilterClick}
            className='p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors'
          >
            <Filter className='w-5 h-5' />
          </button>
        )}
        {rightSlot}
      </div>
    </div>
  );
}
