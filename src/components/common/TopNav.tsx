'use client';

import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

interface TopNavProps {
  title: string;
  center?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onBack?: () => void;
}

export default function TopNav({
  title,
  center = true,
  leftSlot,
  rightSlot,
  onBack,
}: TopNavProps) {
  return (
    <div className='relative flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-black'>
      {/* Left */}
      <div className='flex items-center gap-2 z-10'>
        {onBack && (
          <button onClick={onBack}>
            <ArrowLeft className='w-5 h-5 text-gray-700 dark:text-gray-300' />
          </button>
        )}
        {leftSlot}
      </div>

      {/* Title */}
      {center ? (
        <div className='absolute left-0 right-0 flex justify-center pointer-events-none'>
          <h1 className='text-lg font-semibold'>{title}</h1>
        </div>
      ) : (
        <h1 className='text-lg font-semibold'>{title}</h1>
      )}

      {/* Right */}
      <div className='flex items-center gap-3 z-10'>{rightSlot}</div>
    </div>
  );
}
