// components/ui/section.tsx

import { ReactNode } from 'react';
import { cn } from '@/modules/shared/lib/utils';

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, children, className }: SectionProps) {
  return (
    <section className={cn('text-foreground', className)}>
      {title && (
        <h3 className='text-body text-foreground font-semibold mb-compact px-component pt-component'>
          {title}
        </h3>
      )}
      {children}
    </section>
  );
}
