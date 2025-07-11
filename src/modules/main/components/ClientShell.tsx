'use client';

import { ReactNode, useEffect } from 'react';
import AuthGuard from '@/modules/auth/components/AuthGuard';
import RouteTracker from '@/providers/RouteTracker';
import { ThemeProvider } from '@/providers/ThemeProvider';
import BottomNav from '@/components/navigation/BottomNav';
import useAuthRedirectSync from '@/modules/auth/hooks/useAuthRedirectSync';
import { useBudgetAlert } from '@/modules/shared/hooks/budgetAlert';
import PushListener from '@/lib/PushListener';
import { usePushNotifications } from '@/lib/notifications';

export default function ClientShell({ children }: { children: ReactNode }) {
  const loading = useAuthRedirectSync();
  useBudgetAlert();
  const { requestPermissionAndGetToken } = usePushNotifications();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      requestPermissionAndGetToken().then((token) => {
        if (token) {
          console.log('✅ FCM Token from ClientShell:', token);
          // 여기서 API 호출 등으로 서버에 토큰 저장 가능
        } else {
          console.warn('🔒 사용자 푸시 토큰 없음');
        }
      });
    }
  }, [requestPermissionAndGetToken]);

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
        <PushListener />
        <BottomNav />
      </ThemeProvider>
    </AuthGuard>
  );
}
