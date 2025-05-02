// src/components/common/TabMenu.tsx
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
        'flex border-b border-border text-label bg-surface',
        variant === 'pill' && 'justify-around py-element'
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;

        const baseStyle = 'transition-all duration-150';
        const pillStyle = cn(
          'px-component py-tight rounded-full border',
          isActive
            ? 'text-foreground border-border font-semibold bg-muted/10'
            : 'text-muted border-transparent hover:bg-muted/5'
        );
        const underlineStyle = cn(
          'flex-1 py-element text-label font-medium text-center',
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

const TabMenu = memo(TabMenuBase);
export default TabMenu;
