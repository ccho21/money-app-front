// src/app/account/layout.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { useAccountFormStore } from '@/modules/account/store/formStore';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/modules/shared/stores/useUIStore';
import TopNav from '@/components/navigation/TopNav';
import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';

export default function AccountLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { reset } = useAccountFormStore();
  const prevPath = useUIStore((s) => s.previousPath) || '/account/new';

  return (
    <div className='min-h-screen flex flex-col h-full text-foreground pb-[10vh]'>
      <main className='flex-1 overflow-y-auto bg-muted/20'>{children}</main>
    </div>
  );
}
