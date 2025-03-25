'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '../store';

const PUBLIC_ROUTES = ['/signin', '/signup'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const isPublic = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!user && !isPublic) {
      router.replace('/signin');
    }
  }, [user, isPublic]);

  if (!user && !isPublic) return null;

  return <>{children}</>;
}
