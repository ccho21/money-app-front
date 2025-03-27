'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@features/auth/store';
import { SigninResponse } from '@features/auth/types';
import { post } from '@features/shared/api';
import RedirectIfAuthenticated from '@components/common/RedirectIfAuthenticated';

export default function SignupPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.replace('/dashboard/daily');
    }
  }, [user]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmValid = password === confirm;

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValid) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    if (!isPasswordValid) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (!isConfirmValid) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await post<
        SigninResponse,
        { email: string; password: string }
      >('/auth/signup', {
        email,
        password,
      });

      console.log('회원가입 성공:', res);
      router.push('/signin');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('회원가입 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  if (user) return null;

  return (
    <RedirectIfAuthenticated>
      <div className='flex items-center justify-center bg-gray-50 dark:bg-black px-4'>
        <form
          onSubmit={handleSignup}
          className='w-full max-w-md space-y-6 p-8 bg-white dark:bg-zinc-900 shadow rounded-lg'
        >
          <h1 className='text-2xl font-bold text-center'>회원가입</h1>

          {error && (
            <div className='text-red-500 text-sm text-center'>{error}</div>
          )}

          {/* 이메일 */}
          <div className='space-y-2'>
            <label htmlFor='email' className='block text-sm font-medium'>
              이메일
            </label>
            <input
              id='email'
              type='email'
              className={`w-full px-4 py-2 border rounded dark:bg-zinc-800 ${
                email && !isEmailValid ? 'border-red-500' : ''
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 */}
          <div className='space-y-2'>
            <label htmlFor='password' className='block text-sm font-medium'>
              비밀번호
            </label>
            <input
              id='password'
              type='password'
              className={`w-full px-4 py-2 border rounded dark:bg-zinc-800 ${
                password && !isPasswordValid ? 'border-red-500' : ''
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className='space-y-2'>
            <label htmlFor='confirm' className='block text-sm font-medium'>
              비밀번호 확인
            </label>
            <input
              id='confirm'
              type='password'
              className={`w-full px-4 py-2 border rounded dark:bg-zinc-800 ${
                confirm && !isConfirmValid ? 'border-red-500' : ''
              }`}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold'
          >
            회원가입
          </button>

          <p className='text-sm text-center text-gray-500'>
            이미 계정이 있으신가요?{' '}
            <a href='/signin' className='text-red-500 font-medium'>
              로그인
            </a>
          </p>
        </form>
      </div>
    </RedirectIfAuthenticated>
  );
}
