import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '../../../stores/useUserStore';
import { authGet } from '../api';
import { User } from '../types';

export default function useAuthRedirectSync() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await authGet<User>('/auth/me');
        setUser({ id: res.id, email: res.email });
      } catch (err: unknown) {
        if (err) {
          console.error(err);
        }

        const isPublicRoute = pathname === '/signin' || pathname === '/signup';
        if (!isPublicRoute) {
          router.replace('/signin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, setUser, pathname, router]);

  return loading;
}
