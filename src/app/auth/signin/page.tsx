'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import RedirectIfAuthenticated from '@/modules/auth/components/RedirectIfAuthenticated';
import { signin } from '@/modules/auth/hooks/hooks';
import { API_BASE_URL } from '@/modules/shared/common/api';
import { GalleryVerticalEnd } from 'lucide-react';
import { SigninForm } from '@/modules/auth/components/SigninForm';
import Link from 'next/link';

export default function SigninPage() {
  const router = useRouter();
  const { error } = useAuthStore();

  const handleSignin = async (email: string, password: string) => {
    const success = await signin(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      // toast.error('이메일 또는 비밀번호가 올바르지 않습니다');
    }
  };

  const handleGoogleSignin = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const state = JSON.stringify({ timezone });

    window.location.href = `${API_BASE_URL}/auth/google?state=${encodeURIComponent(
      state
    )}`;
  };

  return (
    <RedirectIfAuthenticated>
      <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
        <div className='flex w-full max-w-sm flex-col gap-6'>
          <Link
            href='/'
            className='flex items-center gap-2 self-center font-medium'
          >
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            Money App
          </Link>
          <SigninForm
            onSubmit={handleSignin}
            onGoogleSignin={handleGoogleSignin}
            error={error}
          />
        </div>
      </div>
    </RedirectIfAuthenticated>
  );
}
