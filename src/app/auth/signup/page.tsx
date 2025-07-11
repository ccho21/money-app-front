'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { signup } from '@/modules/auth/hooks/hooks';
import { API_BASE_URL } from '@/modules/shared/common/api';
import { GalleryVerticalEnd } from 'lucide-react';
import { SignupForm } from '@/modules/auth/components/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const { error } = useAuthStore();

  const handleSignup = async (
    email: string,
    password: string,
    timezone?: string
  ) => {
    const success = await signup(email, password, timezone);
    if (success) {
      router.push('/dashboard');
    }
  };

  const handleGoogleSignin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className='min-h-svh flex items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm flex flex-col gap-6'>
        <Link
          href='/'
          className='flex items-center justify-center gap-2 font-medium'
        >
          <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          Money App
        </Link>
        <SignupForm
          onSubmit={handleSignup}
          onGoogleSignin={handleGoogleSignin}
          error={error}
        />
      </div>
    </div>
  );
}
