// src/components/ui/panel/Panel.tsx
import { ReactNode } from 'react';
import { cn } from '@/modules/shared/lib/utils'; // Tailwind class merge util

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
        'text-foreground',
        rounded && 'rounded-section',
        bordered && 'border border-border',
        shadow && 'shadow-sm',
        className
      )}
    >
      {title && (
        <h3 className='text-body text-foreground font-semibold mb-compact px-component pt-component'>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
