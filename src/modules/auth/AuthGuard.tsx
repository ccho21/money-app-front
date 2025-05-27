'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/modules/shared/stores/useUserStore';

const PUBLIC_ROUTES = ['/auth/signin', '/auth/signup'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUserStore(); // ✅ 구조 분리로 접근
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!user && !isPublic) {
      router.replace('/auth/signin');
    }
  }, [user, isPublic, router]);

  if (typeof window !== 'undefined' && !user && !isPublic) {
    return null; // block render
  }

  return <>{children}</>;
}
