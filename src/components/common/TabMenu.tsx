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
        requestAnimationFrame(() => {
          onChange(key);
        });
      }
    },
    [onChange, active]
  );

  return (
    <div
      className={cn(
        'flex text-label',
        variant === 'pill' && 'justify-around py-element'
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;

        const baseStyle = 'transition-colors duration-150';

        const pillStyle = cn(
          'px-component py-tight rounded-full border text-sm',
          isActive
            ? 'bg-muted/10 text-foreground border-border/60 font-medium'
            : 'text-muted-foreground border-transparent hover:bg-muted/5 hover:text-foreground/80'
        );

        const underlineStyle = cn(
          'flex-1 py-element text-sm text-center tracking-tight',
          isActive
            ? 'border-b-2 border-primary text-primary font-medium'
            : 'text-muted-foreground hover:text-foreground/80'
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

const TabMenu = memo(TabMenuBase);
export default TabMenu;
