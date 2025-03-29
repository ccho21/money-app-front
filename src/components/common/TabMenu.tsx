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
  variant?: 'pill' | 'underline'; // ✅ 디자인 스타일 선택
}

export default function TabMenu({
  tabs,
  active,
  onChange,
  variant = 'pill',
}: TabMenuProps) {
  return (
    <div
      className={cn(
        'flex',
        variant === 'pill'
          ? 'justify-around py-2 border-b text-sm dark:border-gray-700'
          : 'border-b border-gray-200'
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            'transition-all duration-150',
            variant === 'pill'
              ? cn(
                  'px-4 py-1 rounded-full border',
                  active === tab.key
                    ? 'border-black text-black dark:border-white dark:text-white font-semibold'
                    : 'text-gray-400 border-transparent'
                )
              : cn(
                  'flex-1 py-2 text-sm font-medium',
                  active === tab.key
                    ? 'border-b-2 border-red-500 text-red-500'
                    : 'text-gray-400'
                )
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
