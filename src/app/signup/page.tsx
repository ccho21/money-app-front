'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import RedirectIfAuthenticated from '@/components/common/RedirectIfAuthenticated';

export default function SignupPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const signup = useUserStore((state) => state.signup);

  useEffect(() => {
    if (user) {
      router.replace('/dashboard/daily');
    }
  }, [user]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmValid = password === confirm;

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValid) {
      return;
    }

    if (!isPasswordValid) {
      return;
    }

    if (!isConfirmValid) {
      return;
    }

    // 회원가입을 store로 위임
    await signup(email, password);

    // Signin 페이지로 이동
    if (!error) {
      router.push('/signin');
    }
  };

  if (user) return null;

  return (
    <RedirectIfAuthenticated>
      <div className="flex items-center justify-center bg-gray-50 dark:bg-black px-4">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-md space-y-6 p-8 bg-white dark:bg-zinc-900 shadow rounded-lg"
        >
          <h1 className="text-2xl font-bold text-center">회원가입</h1>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          {/* 이메일 */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              이메일
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 border rounded dark:bg-zinc-800 ${
                email && !isEmailValid ? 'border-red-500' : ''
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-4 py-2 border rounded dark:bg-zinc-800 ${
                password && !isPasswordValid ? 'border-red-500' : ''
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-2">
            <label htmlFor="confirm" className="block text-sm font-medium">
              비밀번호 확인
            </label>
            <input
              id="confirm"
              type="password"
              className={`w-full px-4 py-2 border rounded dark:bg-zinc-800 ${
                confirm && !isConfirmValid ? 'border-red-500' : ''
              }`}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold"
            disabled={isLoading} // 로딩 중 버튼 비활성화
          >
            {isLoading ? '로딩 중...' : '회원가입'}
          </button>

          <p className="text-sm text-center text-gray-500">
            이미 계정이 있으신가요?{' '}
            <a href="/signin" className="text-red-500 font-medium">
              로그인
            </a>
          </p>
        </form>
      </div>
    </RedirectIfAuthenticated>
  );
}
