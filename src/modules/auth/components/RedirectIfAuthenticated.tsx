// src/components/common/RedirectIfAuthenticated.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

interface Props {
  children: React.ReactNode;
}

export default function RedirectIfAuthenticated({ children }: Props) {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.replace('');
    }
  }, [user, router]);

  if (user) return null;

  return <>{children}</>;
}
