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
    <div className='layout-shell bg-muted'>
      <TopNav />
      <main className='layout-body'>{children}</main>
    </div>
  );
}
