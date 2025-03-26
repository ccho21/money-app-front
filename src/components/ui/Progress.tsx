'use client';

import React from 'react';
import clsx from 'clsx';

interface ProgressProps {
  value: number; // 0~100
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  return (
    <div
      className={clsx(
        'w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden',
        className
      )}
    >
      <div
        className='h-full bg-blue-500 transition-all duration-300'
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
};
