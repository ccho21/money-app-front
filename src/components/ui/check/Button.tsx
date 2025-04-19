'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  color?: 'primary' | 'danger' | 'gray';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'solid', color = 'primary', ...props }, ref) => {
    const base =
      'text-sm font-semibold py-1 px-2 rounded-[2px] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1';

    const variants = {
      solid: {
        primary: 'bg-primary text-on-primary hover:bg-primary/90',
        danger: 'bg-error text-white hover:bg-error',
        gray: 'bg-muted text-white hover:bg-muted/80',
      },
      outline: {
        primary:
          'border border-primary text-primary bg-surface hover:bg-primary/10',
        danger:
          'border border-error text-error bg-surface hover:bg-error/10 hover:text-white',
        gray: 'border border-border text-muted bg-surface hover:bg-muted/10',
      },
    };

    const safeVariant = variant in variants ? variant : 'solid';
    const safeColor = color in variants[safeVariant] ? color : 'primary';
    const variantClass = variants[safeVariant][safeColor];

    return (
      <button
        ref={ref}
        className={cn(base, variantClass, className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
