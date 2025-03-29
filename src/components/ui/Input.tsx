// 📄 경로: src/components/ui/Input.tsx
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
      <div className='space-y-1'>
        {label && (
          <label className='text-xs text-gray-500 dark:text-gray-400 font-medium px-1'>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full border-0 border-b text-sm py-2 px-1 bg-transparent',
            'focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            error && 'border-b-red-500',
            className
          )}
          {...props}
        />
        {description && (
          <p className='text-xs text-gray-400 px-1'>{description}</p>
        )}
        {error && <p className='text-xs text-red-500 px-1'>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
