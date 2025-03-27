// 📄 경로: src/components/ui/Input.tsx
'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full px-4 py-2 border rounded-md shadow-sm text-sm',
          'border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
