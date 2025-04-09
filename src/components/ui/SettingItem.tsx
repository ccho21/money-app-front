'use client';

import { ChevronRight } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface SettingItemProps {
  icon: ReactNode;
  title: string;
  subtitle?: string | ReactNode;
  onClick?: () => void;
  interactive?: boolean;
}

export default function SettingItem({
  icon,
  title,
  subtitle,
  onClick,
  interactive = false,
}: SettingItemProps) {
  const [showSelector, setShowSelector] = useState(false);

  const handleClick = () => {
    if (interactive) {
      setShowSelector((prev) => !prev);
    } else {
      onClick?.();
    }
  };

  return (
    <div
      onClick={handleClick}
      className='flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 transition hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer'
    >
      <div className='flex items-center gap-3'>
        {icon}
        <div className='text-left'>
          <p className='text-sm font-medium text-gray-900 dark:text-white'>
            {title}
          </p>

          {typeof subtitle === 'string' && (
            <p className='text-xs text-gray-400 dark:text-gray-500 truncate w-[220px]'>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className='flex items-center'>
        {interactive && showSelector && typeof subtitle !== 'string' && (
          <div onClick={(e) => e.stopPropagation()}>{subtitle}</div>
        )}
        {!interactive && <ChevronRight size={16} className='text-gray-400' />}
      </div>
    </div>
  );
}
