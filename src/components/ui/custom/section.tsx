import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function Section({
  title,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn('space-y-element', className)} {...props}>
      {title && (
        <h2 className='scroll-m-20 text-md font-semibold tracking-tight text-foreground'>
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
