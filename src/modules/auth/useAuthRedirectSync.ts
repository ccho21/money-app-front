'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { fetchUser } from './hooks';

export default function useAuthRedirectSync() {
  const { user } = useUserStore();

  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const fetchAndRedirect = async () => {
      try {
        await fetchUser(); // ✅ 서비스 호출 (store 내부에서 상태 변경 처리함)
      } catch (err) {
        console.error('❌ 세션 복원 실패:', err);
        const isPublic = pathname === '/signin' || pathname === '/signup';
        if (!isPublic) {
          router.replace('/signin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAndRedirect();
  }, [user, pathname, router]);

  return loading;
}
