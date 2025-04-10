'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  label?: string;
  error?: string;
  description?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, description, className, ...props }, ref) => {
    return (
      <div className='grid grid-cols-12 items-start gap-2'>
        {label && (
          <label className='col-span-2 text-xs text-muted font-medium px-1'>
            {label}
          </label>
        )}
        <div className={label ? 'col-span-10' : 'col-span-12'}>
          <textarea
            ref={ref}
            className={cn(
              'w-full border-0 border-b border-border text-sm py-2 px-1 bg-transparent resize-none',
              'focus:outline-none focus:ring-0 focus:border-foreground',
              'placeholder:text-muted',
              error && 'border-b-error',
              className
            )}
            {...props}
          />
          {description && (
            <p className='text-xs text-muted px-1 mt-1'>{description}</p>
          )}
          {error && <p className='text-xs text-error px-1 mt-1'>{error}</p>}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
