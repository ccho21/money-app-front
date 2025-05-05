'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/signin'); // 404 시 자동으로 /signin 으로 리다이렉트
  }, [router]);

  return null;
}
