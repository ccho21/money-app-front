'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

const PUBLIC_ROUTES = ['/auth/signin', '/auth/signup'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore(); // ✅ 구조 분리로 접근
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
