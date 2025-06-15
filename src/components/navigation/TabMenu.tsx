'use client';

import { memo, useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/modules/shared/util/style.utils';

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
    <Tabs
      value={active}
      onValueChange={handleClick}
      className='w-full border-b border-b-border mb-4'
    >
      <TabsList
        className={cn(
          'flex items-center w-full',
          'text-sm font-medium bg-transparent p-0 rounded-none'
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.key}
            value={tab.key}
            className={cn(
              'border-b-2 border-b-transparent px-0 rounded-none',
              'data-[state=active]:border-b-primary',
              'data-[state=active]:shadow-none'
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
