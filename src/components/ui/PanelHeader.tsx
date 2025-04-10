'use client';

import { ReactNode } from 'react';

interface PanelHeaderProps {
  children: ReactNode;
}

export default function PanelHeader({ children }: PanelHeaderProps) {
  return (
    <div className='px-3 pt-5 pb-2 border-b border-border'>{children}</div>
  );
}
