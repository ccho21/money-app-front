// src/components/ui/panel/Panel.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils'; // Tailwind class merge util

interface PanelProps {
  children: ReactNode;
  className?: string;
  rounded?: boolean;
  bordered?: boolean;
  shadow?: boolean;
  title?: string;
}

export default function Panel({
  children,
  className = '',
  rounded = false,
  bordered = false,
  shadow = false,
  title,
}: PanelProps) {
  return (
    <div
      className={cn(
        'bg-surface text-foreground border-b border-border',
        rounded && 'rounded-section',
        bordered && 'border border-border',
        shadow && 'shadow-sm',
        className
      )}
    >
      {title && (
        <h3 className='text-caption text-muted font-semibold mb-compact px-component pt-component'>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
