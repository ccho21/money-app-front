import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  color?: 'primary' | 'error' | 'success' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
  rounded?: 'md' | 'full';
}

export default function Badge({
  children,
  color = 'gray',
  size = 'md',
  rounded = 'md',
  className,
}: BadgeProps) {
  const colors = {
    primary: 'bg-primary/10 text-primary',
    error: 'bg-error/10 text-error',
    success: 'bg-green-100 text-green-600',
    gray: 'bg-muted/20 text-muted-foreground',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  const roundedClass = {
    md: 'rounded-md',
    full: 'rounded-full',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        colors[color],
        sizes[size],
        roundedClass[rounded],
        className
      )}
    >
      {children}
    </span>
  );
}
