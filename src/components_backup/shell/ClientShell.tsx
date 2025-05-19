'use client';

import { ReactNode } from 'react';
import AuthGuard from '@/components_backup/auth/AuthGuard';
import RouteTracker from '@/providers/RouteTracker';
import { ThemeProvider } from '@/providers/ThemeProvider';
import BottomNav from '@/components/navigation/BottomNav';
import useAuthRedirectSync from '@/modules/auth/useAuthRedirectSync'; // ✅ 훅 import

export default function ClientShell({ children }: { children: ReactNode }) {
  const loading = useAuthRedirectSync();

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <span className='text-sm text-muted dark:text-muted-foreground'>
          로딩 중...
        </span>
      </div>
    );
  }

  return (
    <AuthGuard>
      <RouteTracker />
      <ThemeProvider>
        <main className='w-full'>{children}</main>
        <BottomNav />
      </ThemeProvider>
    </AuthGuard>
  );
}
