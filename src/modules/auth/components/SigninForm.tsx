// src/modules/auth/components/SigninForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/modules/shared/util/style.utils';
import Link from 'next/link';

interface SigninFormProps {
  onSubmit: (email: string, password: string) => void;
  onGoogleSignin: () => void;
  className?: string;
  error?: string | null;
}

export function SigninForm({
  onSubmit,
  onGoogleSignin,
  className,
  error,
  ...props
}: SigninFormProps) {
  const [email, setEmail] = useState('seeduser@example.com');
  const [password, setPassword] = useState('secure123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {error && <div className='text-sm text-red-500 text-center'>{error}</div>}
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back</CardTitle>
          <CardDescription>Sign in with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='grid gap-6'>
            <div className='flex flex-col gap-4'>
              <Button
                type='button'
                variant='outline'
                className='w-full'
                onClick={onGoogleSignin}
              >
                <svg
                  className='mr-2 h-4 w-4'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill='currentColor'
                    d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>

            <div className='relative text-center text-sm'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t' />
              </div>
              <span className='relative z-10 bg-card px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>

            <div className='grid gap-3'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='grid gap-3'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <a
                  href='#'
                  className='ml-auto text-sm underline-offset-4 hover:underline'
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type='submit' className='w-full'>
              Signin
            </Button>

            <div className='text-center text-sm'>
              Don’t have an account?{' '}
              <Link
                href='/auth/signup'
                className='underline underline-offset-4'
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className='text-center text-xs text-muted-foreground'>
        By clicking continue, you agree to our{' '}
        <Link href='#' className='underline underline-offset-4'>
          Terms of Service
        </Link>
        <span className='mx-tight'>and</span>  
        <Link href='#' className='underline underline-offset-4'>
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
