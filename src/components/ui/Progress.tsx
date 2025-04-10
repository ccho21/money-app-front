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
        'w-full h-2 rounded-full overflow-hidden bg-border',
        className
      )}
    >
      <div
        className='h-full bg-primary transition-all duration-300'
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
};
