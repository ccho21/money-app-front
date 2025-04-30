'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  description?: string;
  labelPosition?: 'top' | 'left';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, description, labelPosition = 'top', className, ...props },
    ref
  ) => {
    const isLeftLabel = label && labelPosition === 'left';

    return (
      <div
        className={cn(isLeftLabel ? 'grid grid-cols-12 gap-2' : 'space-y-1')}
      >
        {label && (
          <label
            className={cn(
              'text-sm font-medium',
              isLeftLabel
                ? 'col-span-2 text-muted px-1 pt-1.5'
                : 'text-foreground'
            )}
          >
            {label}
          </label>
        )}

        <div className={isLeftLabel ? 'col-span-10' : ''}>
          <textarea
            ref={ref}
            rows={4}
            className={cn(
              'w-full border-0 border-b border-border bg-transparent text-sm py-2 px-1 resize-none',
              'focus:outline-none focus:ring-0 focus:border-foreground',
              'placeholder:text-muted',
              error && 'border-b-error',
              className
            )}
            {...props}
          />
          {description && (
            <p className='mt-1 text-xs text-muted px-1'>{description}</p>
          )}
          {error && <p className='mt-1 text-xs text-error px-1'>{error}</p>}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
