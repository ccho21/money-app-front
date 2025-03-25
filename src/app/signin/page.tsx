'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@features/auth/store';
import { post } from '@features/shared/api';
import { authGet } from '@features/auth/api';
import { User } from '@features/auth/types';
import RedirectIfAuthenticated from '@components/common/RedirectIfAuthenticated';

export default function SigninPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState('seeduser@example.com');
  const [password, setPassword] = useState('secure123');
  const [error, setError] = useState('');

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await post('/auth/signin', { email, password }); // 이제 access_token은 서버가 쿠키로 설정

      // 로그인 성공 후 /auth/me 요청
      const userInfo = await authGet<User>('/auth/me');
      console.log('현재 로그인된 유저:', userInfo);
      setUser({ id: userInfo.id, email: userInfo.email });

      router.push('/dashboard/daily');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인 오류');
    }
  };

  const handleGoogleSignin = () => {
    window.location.href = 'http://localhost:3000/auth/google'; // 백엔드 연동
  };

  return (
    <RedirectIfAuthenticated>
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4'>
        <form
          onSubmit={handleSignin}
          className='w-full max-w-md space-y-6 p-8 bg-white dark:bg-zinc-900 shadow rounded-lg'
        >
          <h1 className='text-2xl font-bold text-center'>로그인</h1>

          {error && (
            <div className='text-red-500 text-sm text-center'>{error}</div>
          )}

          {/* 이메일 입력 */}
          <div className='space-y-2'>
            <label htmlFor='email' className='block text-sm font-medium'>
              이메일
            </label>
            <input
              id='email'
              type='email'
              className='w-full px-4 py-2 border rounded dark:bg-zinc-800'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className='space-y-2'>
            <label htmlFor='password' className='block text-sm font-medium'>
              비밀번호
            </label>
            <input
              id='password'
              type='password'
              className='w-full px-4 py-2 border rounded dark:bg-zinc-800'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type='submit'
            className='w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold'
          >
            로그인
          </button>

          {/* 구분선 */}
          <div className='relative my-4'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300 dark:border-gray-700' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white dark:bg-zinc-900 px-2 text-gray-500'>
                또는
              </span>
            </div>
          </div>

          {/* Google 로그인 버튼 */}
          <button
            type='button'
            onClick={handleGoogleSignin}
            className='w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition'
          >
            <img
              src='https://www.svgrepo.com/show/475656/google-color.svg'
              alt='Google'
              className='w-5 h-5'
            />
            <span className='text-sm font-medium'>Google 계정으로 로그인</span>
          </button>

          <p className='text-sm text-center text-gray-500'>
            아직 계정이 없으신가요?{' '}
            <a href='/signup' className='text-red-500 font-medium'>
              회원가입
            </a>
          </p>
        </form>
      </div>
    </RedirectIfAuthenticated>
  );
}
