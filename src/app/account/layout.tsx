// src/app/account/layout.tsx
'use client';

import TopNav from '@/components/navigation/TopNav';
import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function AccountLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  useTopNavPreset({
    title: 'Account',
    onBack: () => router.back(),
  });

  return (
    <div className='layout-shell bg-muted'>
      <TopNav />
      <main className='layout-body'>{children}</main>
    </div>
  );
}
