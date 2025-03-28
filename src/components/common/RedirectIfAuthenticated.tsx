import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';

export default function RedirectIfAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.replace('/dashboard/daily');
    }
  }, [router, user]);

  if (user) return null;
  return <>{children}</>;
}
