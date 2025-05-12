'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import AuthGuard from '@/components_backup/auth/AuthGuard';
import RouteTracker from '@/providers/RouteTracker';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useUserStore } from '@/stores/useUserStore';
import { fetchUser } from '@/modules/auth/hooks';
import BottomNav from '../common/BottomNav';

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const run = async () => {
      try {
        await fetchUser();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        const isPublic =
          pathname === '/auth/signin' || pathname === '/auth/signup';
        if (!isPublic) router.replace('/signin');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [user, pathname, router]);

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
        <BottomNav></BottomNav>
      </ThemeProvider>
    </AuthGuard>
  );
}
