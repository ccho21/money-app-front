'use client';

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'primary' | 'danger' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      icon: Icon,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 rounded-md';

    const variants = {
      solid: {
        primary: 'bg-primary text-on-primary hover:bg-primary/90',
        danger: 'bg-error text-white hover:bg-error/90',
        gray: 'bg-muted text-white hover:bg-muted/80',
      },
      outline: {
        primary: 'border border-primary text-primary hover:bg-primary/10',
        danger: 'border border-error text-error hover:bg-error/10',
        gray: 'border border-border text-muted hover:bg-muted/10',
      },
      ghost: {
        primary: 'bg-transparent text-primary hover:bg-primary/10',
        danger: 'bg-transparent text-error hover:bg-error/10',
        gray: 'bg-transparent text-muted hover:bg-muted/10',
      },
    };

    const sizes = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-5 py-3',
    };

    const safeVariant = variant in variants ? variant : 'solid';
    const safeColor = color in variants[safeVariant] ? color : 'primary';
    const variantClass = variants[safeVariant][safeColor];
    const sizeClass = sizes[size];

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variantClass,
          sizeClass,
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {Icon && <Icon className='mr-2 h-4 w-4' />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
