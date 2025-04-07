'use client';

import { ReactNode } from 'react';

interface PanelContentProps {
  children: ReactNode;
}

export default function PanelContent({ children }: PanelContentProps) {
  return (
    <div className="overflow-y-auto px-5 pb-24 max-h-[calc(80vh-60px)]">
      {children}
    </div>
  );
}
