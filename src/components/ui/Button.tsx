// 📄 경로: src/components/ui/Button.tsx
'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  color?: 'primary' | 'danger' | 'gray';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'solid', color = 'primary', ...props }, ref) => {
    const base = 'text-sm font-semibold py-3 rounded-md';

    const variants = {
      solid: {
        primary: 'bg-[#FF5B38] text-white',
        danger: 'bg-red-500 text-white',
        gray: 'bg-gray-500 text-white',
      },
      outline: {
        primary: 'border border-[#FF5B38] text-[#FF5B38] bg-white',
        danger: 'border border-red-500 text-red-500 bg-white',
        gray: 'border border-gray-300 text-gray-600 bg-white',
      },
    };

    // 스타일 안전 처리
    const safeVariant = variant in variants ? variant : 'solid';
    const safeColor = color in variants[safeVariant] ? color : 'primary';

    const variantClass = variants[safeVariant][safeColor];

    return (
      <button
        ref={ref}
        className={cn(base, variantClass, className)} // className 항상 마지막!
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
