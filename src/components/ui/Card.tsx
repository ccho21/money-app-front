'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  url?: string;
}

export function Card({
  title,
  description,
  children,
  url,
  className,
  ...props
}: CardProps) {
  const inner = (
    <div
      className={cn(
        'bg-surface p-5 border-l border-r border-b border-border rounded-md',
        className
      )}
      {...props}
    >
      {title && (
        <div className='mb-3'>
          <h2 className='text-base font-semibold text-foreground'>{title}</h2>
          {description && (
            <p className='text-sm text-muted mt-1'>{description}</p>
          )}
        </div>
      )}
      {children && <div className='space-y-2'>{children}</div>}
    </div>
  );

  return url ? <Link href={url}>{inner}</Link> : inner;
}
