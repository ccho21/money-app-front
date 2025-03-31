'use client';

import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'next/navigation';

export default function SignoutButton() {
  const router = useRouter();
  const { actions } = useUserStore(); // ✅ 구조 기반 접근

  const handleSignout = async () => {
    await actions.signout();
    router.push('/signin');
  };

  return (
    <button
      onClick={handleSignout}
      className='text-sm text-red-500 hover:underline'
    >
      로그아웃
    </button>
  );
}
