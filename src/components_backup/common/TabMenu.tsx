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
    <Tabs
      value={active}
      onValueChange={handleClick}
      className='w-full my-component'
    >
      <TabsList className='w-full bg-card border border-border rounded-md p-1 flex justify-between'>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.key}
            value={tab.key}
            className={cn(
              'flex-1 py-2 text-sm rounded-md transition-colors',
              'data-[state=active]:bg-muted',
              'data-[state=active]:text-primary',
              'data-[state=active]:font-medium',
              'text-muted-foreground'
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
