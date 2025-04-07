'use client';

import { ReactNode } from 'react';

interface PanelHeaderProps {
  children: ReactNode;
}

export default function PanelHeader({ children }: PanelHeaderProps) {
  return (
    <div className='px-5 pt-5 pb-2 border-b border-gray-200 dark:border-zinc-700'>
      {children}
    </div>
  );
}
