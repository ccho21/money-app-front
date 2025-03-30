'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  label?: string;
  error?: string;
  description?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ error, description, className, ...props }, ref) => {
    return (
      <div className='grid grid-cols-12 items-start gap-2'>
        <div className='col-span-12'>
          <textarea
            ref={ref}
            className={cn(
              'w-full border-0 border-b border-gray-300 text-sm py-2 px-1 bg-transparent resize-none',
              'focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              error && 'border-b-red-500',
              className
            )}
            {...props}
          />
          {description && (
            <p className='text-xs text-gray-400 px-1 mt-1'>{description}</p>
          )}
          {error && <p className='text-xs text-red-500 px-1 mt-1'>{error}</p>}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
