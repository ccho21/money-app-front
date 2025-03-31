// 📄 src/hooks/useAuthRedirectSync.ts

'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';

export default function useAuthRedirectSync() {
  const { state, actions } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.user) {
      setLoading(false);
      return;
    }

    const fetchAndRedirect = async () => {
      try {
        await actions.fetchUser(); // ✅ 스토어 액션 사용
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
  }, [state.user, pathname, router, actions]);

  return loading;
}
