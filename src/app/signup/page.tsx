'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import RedirectIfAuthenticated from '@/components/common/RedirectIfAuthenticated';

export default function SignupPage() {
  const router = useRouter();
  const { state, actions } = useUserStore(); // ✅ 구조 분리 접근

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmValid = password === confirm;

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValid || !isPasswordValid || !isConfirmValid) return;

    await actions.signup(email, password);

    if (!state.error) {
      router.push('/signin');
    }
  };

  return (
    <RedirectIfAuthenticated>
      <div className='flex items-center justify-center bg-gray-50 dark:bg-black px-4'>
        <form
          onSubmit={handleSignup}
          className='w-full max-w-md space-y-6 p-8 bg-white dark:bg-zinc-900 shadow rounded-lg'
        >
          <h1 className='text-2xl font-bold text-center'>회원가입</h1>

          {state.error && (
            <div className='text-red-500 text-sm text-center'>
              {state.error}
            </div>
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

          {/* 버튼 */}
          <button
            type='submit'
            className='w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold'
            disabled={state.isLoading}
          >
            {state.isLoading ? '로딩 중...' : '회원가입'}
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
