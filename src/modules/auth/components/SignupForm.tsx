'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
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
import Link from 'next/link';
import { cn } from '@/modules/shared/util/style.utils';

interface SignupFormProps {
  onSubmit: (email: string, password: string, timezone?: string) => void;
  onGoogleSignin: () => void;
  error?: string | null;
  className?: string;
}

export function SignupForm({
  className,
  onSubmit,
  error,
  ...props
}: SignupFormProps) {
  const [email, setEmail] = useState('seeduser@example.com');
  const [password, setPassword] = useState('secure123');
  const [repeatPassword, setRepeatPassword] = useState('secure123');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setValidationError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setValidationError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setValidationError(null);
    onSubmit(email, password, timezone);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Create an account</CardTitle>
          <CardDescription>Sign up with Google or your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='grid gap-6'>
            {error && (
              <p className='text-red-500 text-sm text-center'>{error}</p>
            )}
            {validationError && (
              <p className='text-red-500 text-sm text-center'>
                {validationError}
              </p>
            )}

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
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type='button'
                  className='absolute right-2 top-2.5 text-muted-foreground'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </button>
              </div>
            </div>

            <div className='grid gap-3'>
              <Label htmlFor='repeatPassword'>Repeat Password</Label>
              <Input
                id='repeatPassword'
                type={showPassword ? 'text' : 'password'}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </div>

            <Button type='submit' className='w-full'>
              Sign up
            </Button>

            <div className='text-center text-sm'>
              Already have an account with us?
              <Link
                href='/auth/signin'
                className='ml-2 underline underline-offset-4'
              >
                Sign in
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
