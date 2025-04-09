// 📄 src/components/common/TopNav.tsx
'use client';

import { useUIStore } from '@/stores/useUIStore';
import { ChevronLeft, Filter, Pencil, Plus, Search } from 'lucide-react';

export default function TopNav() {
  const {
    title,
    center,
    leftSlot,
    rightSlot,
    onBack,
    onSearchClick,
    onFilterClick,
    showSearchButton,
    showFilterButton,
    onEdit,
    onAdd,
  } = useUIStore((s) => s.topNav);

  const prevPath = useUIStore((s) => s.previousPath);
  const pathName = prevPath?.split('/')[1];

  return (
    <div className='relative flex items-center justify-between px-2 py-2 border-b border-gray-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm'>
      {/* 왼쪽 */}
      <div className='flex items-center gap-2 min-w-[80px] justify-start'>
        {showSearchButton && (
          <button
            onClick={onSearchClick}
            className='p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors'
          >
            <Search className='w-5 h-5' />
          </button>
        )}
        {onBack && (
          <button
            onClick={onBack}
            className='flex items-center gap-1 p-2 rounded-md text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors text-sm'
          >
            <ChevronLeft className='w-4 h-4' />
            <span className='whitespace-nowrap'>{pathName}</span>
          </button>
        )}
        {leftSlot}
      </div>

      {/* 중앙 타이틀 */}
      {center ? (
        <div className='flex justify-center items-center pointer-events-none'>
          <h1 className='text-md font-semibold text-gray-900 dark:text-white'>
            {title}
          </h1>
        </div>
      ) : (
        <h1 className='text-md font-semibold text-gray-900 dark:text-white'>
          {title}
        </h1>
      )}

      {/* 오른쪽 */}
      <div className='flex items-center gap-2 min-w-[80px] justify-end'>
        {showFilterButton && (
          <button
            onClick={onFilterClick}
            className='p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors'
          >
            <Filter className='w-5 h-5' />
          </button>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className='p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors'
          >
            <Pencil className='w-5 h-5' />
          </button>
        )}
        {onAdd && (
          <button
            onClick={onAdd}
            className='p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors'
          >
            <Plus className='w-5 h-5' />
          </button>
        )}

        {rightSlot}
      </div>
    </div>
  );
}
