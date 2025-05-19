'use client';

import { memo, useCallback } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface Tab {
  key: string;
  label: string;
}

interface SubMenuProps {
  active: string;
  onChange: (key: string) => void;
  tabs: { key: string; label: string }[];
}

function SubMenuBase({ tabs, active, onChange }: SubMenuProps) {
  const handleClick = useCallback(
    (key: string | undefined) => {
      if (key && key !== active) {
        onChange(key);
      }
    },
    [active, onChange]
  );

  return (
    <ToggleGroup
      type='single'
      className='flex items-center text-xs text-gray-500'
      value={active}
      onValueChange={handleClick as (value: string) => void}
    >
      {tabs.map((tab) => (
        <ToggleGroupItem
          key={tab.key}
          value={tab.key}
          className={cn(
            'px-4 text-sm h-7',
            'data-[state=on]:bg-blue-100',
            'data-[state=on]:text-blue-600',
            'data-[state=on]:font-semibold',
            'data-[state=on]:rounded-full'
          )}
        >
          {tab.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

const SubMenu = memo(SubMenuBase);
export default SubMenu;
