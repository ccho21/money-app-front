// src/components/dashboard/InsightBanner.tsx

import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface InsightBannerProps {
  icon?: React.ReactNode;
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  className?: string;
}

const variantClasses = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  destructive: 'bg-red-100 text-red-700',
};

export function InsightBanner({
  icon = <Info className='w-4 h-4' />,
  text,
  variant = 'default',
  className,
}: InsightBannerProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg px-4 py-2 text-sm border',
        variantClasses[variant],
        className
      )}
    >
      <div className='shrink-0'>{icon}</div>
      <p className='font-medium'>{text}</p>
    </div>
  );
}
