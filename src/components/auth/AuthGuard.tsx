'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';

const PUBLIC_ROUTES = ['/signin', '/signup'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useUserStore(); // ✅ 구조 분리로 접근
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!state.user && !isPublic) {
      router.replace('/signin');
    }
  }, [state.user, isPublic, router]);

  if (!state.user && !isPublic) return null;

  return <>{children}</>;
}
