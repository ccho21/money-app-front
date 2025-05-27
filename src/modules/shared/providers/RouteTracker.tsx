// 📄 src/app/_components/RouteTracker.tsx
'use client';

import { useUIStore } from '@/modules/shared/stores/useUIStore';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setPaths = useUIStore((s) => s.setPaths); // ✅ 여기서 함수 가져오기;

  useEffect(() => {
    const search = searchParams.toString();
    const fullPath = search ? `${pathname}?${search}` : pathname;

    const current = sessionStorage.getItem('currentPath');
    sessionStorage.setItem('previousPath', current || '');
    sessionStorage.setItem('currentPath', fullPath);
    setPaths(current || null, fullPath); // ✅ zustand에 저장;
  }, [pathname, searchParams, setPaths]);

  return null;
}
