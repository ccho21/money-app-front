'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';

interface Props {
  children: React.ReactNode;
}

export default function RedirectIfAuthenticated({ children }: Props) {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      router.replace('/dashboard/daily');
    }
  }, [user, router]);

  if (user) return null;

  return <>{children}</>;
}
