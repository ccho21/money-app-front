// 📄 src/components/common/TabMenu.tsx
'use client';

import { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  key: string;
  label: string;
}

interface TabMenuProps {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
  variant?: 'pill' | 'underline';
}

function TabMenuBase({
  tabs,
  active,
  onChange,
  variant = 'pill',
}: TabMenuProps) {
  const handleClick = useCallback(
    (key: string) => () => {
      if (key !== active) {
        onChange(key);
      }
    },
    [onChange, active]
  );

  return (
    <div
      className={cn(
        'flex',
        variant === 'pill'
          ? 'justify-around py-2 border-b text-sm dark:border-gray-700'
          : 'border-b border-gray-200'
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;

        const buttonClass = cn(
          'transition-all duration-150',
          variant === 'pill'
            ? cn(
                'px-4 py-1 rounded-full border',
                isActive
                  ? 'border-black text-black dark:border-white dark:text-white font-semibold'
                  : 'text-gray-400 border-transparent'
              )
            : cn(
                'flex-1 py-2 text-sm font-medium',
                isActive
                  ? 'border-b-2 border-red-500 text-red-500'
                  : 'text-gray-400'
              )
        );

        return (
          <button key={tab.key} onClick={handleClick(tab.key)} className={buttonClass}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ✅ memo 적용으로 리렌더 최소화
const TabMenu = memo(TabMenuBase);
export default TabMenu;
