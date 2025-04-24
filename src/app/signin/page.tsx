'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import RedirectIfAuthenticated from '@/components/common/RedirectIfAuthenticated';
import toast from 'react-hot-toast';
import { signin } from '@/modules/auth/hooks';

export default function SigninPage() {
  const router = useRouter();
  const {
    state: { error },
  } = useUserStore();

  const [email, setEmail] = useState('seeduser@example.com');
  const [password, setPassword] = useState('secure123');

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signin(email, password);
    if (success) {
      router.push('/dashboard/daily');
    } else {
      toast.error('이메일 또는 비밀번호가 올바르지 않습니다');
    }
  };

  const handleGoogleSignin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <RedirectIfAuthenticated>
      <div className='flex items-center justify-center min-h-screen bg-background px-4'>
        <form
          onSubmit={handleSignin}
          className='w-full max-w-md space-y-6 p-8 bg-surface border border-border shadow rounded-xl'
        >
          <h1 className='text-2xl font-bold text-center text-foreground'>
            로그인
          </h1>

          {error && (
            <div className='text-sm text-error text-center'>{error}</div>
          )}

          {/* 이메일 입력 */}
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-foreground'
            >
              이메일
            </label>
            <input
              id='email'
              type='email'
              className='w-full px-4 py-2 border border-border rounded bg-transparent text-foreground placeholder-muted'
              placeholder='이메일을 입력하세요'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className='space-y-2'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-foreground'
            >
              비밀번호
            </label>
            <input
              id='password'
              type='password'
              className='w-full px-4 py-2 border border-border rounded bg-transparent text-foreground placeholder-muted'
              placeholder='비밀번호를 입력하세요'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type='submit'
            className='w-full bg-primary hover:bg-primary/90 text-white py-2 rounded font-semibold transition'
          >
            로그인
          </button>

          {/* 구분선 */}
          <div className='relative my-4'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-border' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-surface px-2 text-muted'>또는</span>
            </div>
          </div>

          {/* Google 로그인 */}
          <button
            type='button'
            onClick={handleGoogleSignin}
            className='w-full flex items-center justify-center gap-3 border border-border py-2 rounded hover:bg-muted/10 transition text-sm font-medium text-foreground'
          >
            Google 계정으로 로그인
          </button>

          <p className='text-sm text-center text-muted'>
            아직 계정이 없으신가요?{' '}
            <a href='/signup' className='text-primary font-medium'>
              회원가입
            </a>
          </p>
        </form>
      </div>
    </RedirectIfAuthenticated>
  );
}
