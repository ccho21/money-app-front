'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/modules/shared/stores/useUserStore';
import { fetchUser } from './hooks';

export default function useAuthRedirectSync() {
  const { user } = useUserStore();

  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isPublicPath =
      pathname === '/auth/signin' || pathname === '/auth/signup';

    if (user && isPublicPath) {
      router.replace('/dashboard');
      setLoading(false);
      return;
    }

    if (user) {
      setLoading(false);
      return;
    }

    const fetchAndRedirect = async () => {
      try {
        await fetchUser();
      } catch (err) {
        console.error('❌ 세션 복원 실패:', err);
        if (!isPublicPath) {
          router.replace('/auth/signin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAndRedirect();
  }, [user, pathname, router]);

  return loading;
}
