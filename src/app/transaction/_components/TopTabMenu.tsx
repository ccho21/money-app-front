'use client';

import { cn } from '@/lib/utils';

interface Tab {
  key: string;
  label: string;
}

interface TabMenuProps {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
}

export default function TopTabMenu({ tabs, active, onChange }: TabMenuProps) {
  return (
    <div className='flex justify-around border-b py-2 text-sm dark:border-gray-700'>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            'px-4 py-1 rounded-full border transition-all duration-150',
            active === tab.key
              ? 'border-black text-black dark:border-white dark:text-white font-semibold'
              : 'text-gray-400 border-transparent'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
