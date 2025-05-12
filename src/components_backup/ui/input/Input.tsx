// src/components/ui/input/Input.tsx

'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  label?: string;
  error?: string;
  description?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, description, className, ...props }, ref) => {
    return (
      <div className='grid grid-cols-12 items-center gap-2'>
        {label && (
          <label className='col-span-2 text-caption text-muted font-medium px-1'>
            {label}
          </label>
        )}
        <div className={label ? 'col-span-10' : 'col-span-12'}>
          <input
            ref={ref}
            className={cn(
              'w-full border-0 border-b border-border text-body py-2 px-1 bg-transparent',
              'focus:outline-none focus:ring-0 focus:border-foreground',
              'placeholder:text-muted',
              error && 'border-b-error',
              className
            )}
            {...props}
          />
          {description && (
            <p className='text-caption text-muted px-1 mt-tight'>
              {description}
            </p>
          )}
          {error && (
            <p className='text-caption text-error px-1 mt-tight'>
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
