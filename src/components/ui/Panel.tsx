// 📄 경로: src/components/ui/Panel.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils'; // Tailwind class merge util

interface PanelProps {
  children: ReactNode;
  className?: string;
  rounded?: boolean;
  bordered?: boolean;
  shadow?: boolean;
}

export default function Panel({
  children,
  className = '',
  rounded = false,
  bordered = false,
  shadow = false,
}: PanelProps) {
  return (
    <div
      className={cn(
        'bg-surface text-foreground',
        rounded && 'rounded-2xl',
        bordered && 'border border-border',
        shadow && 'shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
