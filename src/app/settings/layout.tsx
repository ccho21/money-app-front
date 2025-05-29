// src/app/settings/layout.tsx
'use client';

import { ReactNode } from 'react';
import TopNav from '@/components/navigation/TopNav';
import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  useTopNavPreset({
    title: 'Settings',
  });

  return (
    <div className='min-h-screen flex flex-col bg-muted/20 text-foreground'>
      <TopNav />
      <main className='flex-1 overflow-y-auto'>{children}</main>
    </div>
  );
}
