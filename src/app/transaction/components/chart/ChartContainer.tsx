// src/components/chart/ChartContainer.tsx
'use client';

import { ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
}

export function ChartContainer({ title, children }: Props) {
  return (
    <div className='rounded-xl border bg-card p-component space-y-element @container/card'>
      {title && (
        <h2 className='text-heading font-semibold px-element'>{title}</h2>
      )}
      {children}
    </div>
  );
}
