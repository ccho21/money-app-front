import { ReactNode } from 'react';
import { cn } from '@/modules/shared/util/style.utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn('text-foreground rounded-b-md', className)}>{children}</section>
  );
}

interface TitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: TitleProps) {
  return (
    <h3
      className={cn(
        'text-heading text-foreground font-semibold mb-tight',
        className
      )}
    >
      {children}
    </h3>
  );
}

export function SectionSubtitle({ children, className }: TitleProps) {
  return (
    <p className={cn('text-muted-foreground text-sm mb-component', className)}>
      {children}
    </p>
  );
}
