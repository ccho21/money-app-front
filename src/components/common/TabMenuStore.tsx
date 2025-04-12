'use client';

import { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/useUIStore';

function TabMenuBase() {
  const tabMenu = useUIStore((s) => s.tabMenu);
  const setTabMenu = useUIStore((s) => s.setTabMenu);

  const handleClick = useCallback(
    (key: string) => () => {
      if (!tabMenu || key === tabMenu.active) return;

      setTabMenu({ ...tabMenu, active: key });
      tabMenu?.onChange?.(key);
    },
    [tabMenu, setTabMenu]
  );

  if (!tabMenu || !tabMenu.tabs?.length) return null;

  const { tabs, active, variant = 'pill', onChange } = tabMenu;

  return (
    <div
      className={cn(
        'flex border-b border-border text-sm bg-surface',
        variant === 'pill' && 'justify-around py-2'
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;

        const baseStyle = 'transition-all duration-150';
        const pillStyle = cn(
          'px-4 py-1 rounded-full border',
          isActive
            ? 'text-foreground border-foreground font-semibold bg-muted/10'
            : 'text-muted border-transparent hover:bg-muted/5'
        );
        const underlineStyle = cn(
          'flex-1 py-2 text-sm font-medium text-center',
          isActive
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted hover:text-foreground'
        );

        return (
          <button
            key={tab.key}
            onClick={handleClick(tab.key)}
            className={cn(
              baseStyle,
              variant === 'pill' ? pillStyle : underlineStyle
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

const TabMenuStore = memo(TabMenuBase);
export default TabMenuStore;
