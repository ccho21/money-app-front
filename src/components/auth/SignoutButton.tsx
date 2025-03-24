'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

export default function SignoutButton() {
  const logout = useUserStore((state) => state.signout);
  const router = useRouter();

  const handleSignout = () => {
    logout();
    router.push('/signin');
  };

  return (
    <button onClick={handleSignout} className="text-sm text-red-500 hover:underline">
      로그아웃
    </button>
  );
}
