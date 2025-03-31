// 📄 src/components/common/RedirectIfAuthenticated.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';

export default function RedirectIfAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { state } = useUserStore(); // ✅ 구조 분리로 접근

  useEffect(() => {
    if (state.user) {
      router.replace('/dashboard/daily');
    }
  }, [router, state.user]);

  if (state.user) return null;
  return <>{children}</>;
}
