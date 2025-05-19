'use client';

import { memo, useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components_backup/ui/tabs';
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

function TabMenuBase({ tabs, active, onChange }: TabMenuProps) {
  const handleClick = useCallback(
    (key: string) => {
      if (key !== active) {
        requestAnimationFrame(() => {
          onChange(key);
        });
      }
    },
    [active, onChange]
  );

  return (
    <Tabs value={active} onValueChange={handleClick} className='w-full border-b border-b-border'>
      <TabsList
        className={cn(
          // Toss-style underline tab bar
          'flex items-center w-full',
          'text-sm font-medium bg-transparent p-0 rounded-none'
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.key}
            value={tab.key}
            className={cn(
              'border-b-2 border-b-transparent',
              'rounded-none px-0',

              'data-[state=active]:shadow-none',
              'data-[state=active]:border-b-blue-600'
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

const TabMenu = memo(TabMenuBase);
export default TabMenu;
