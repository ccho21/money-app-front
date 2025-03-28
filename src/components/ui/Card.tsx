'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  url?: string;
}

export function Card({
  title,
  description,
  children,
  url,
  className,
  ...props
}: CardProps) {
  const inner = (
    <div
      className={cn(
        // 🟤 약간 따뜻한 배경 + 지갑 느낌 border + 입체감
        'bg-[#fefefe] dark:bg-zinc-900 rounded-2xl p-5 border border-gray-200 dark:border-zinc-800 shadow-inner shadow-gray-100 dark:shadow-none ring-1 ring-inset ring-gray-100 dark:ring-zinc-800 hover:shadow-md hover:-translate-y-[1px] transition-all duration-200',
        className
      )}
      {...props}
    >
      {title && (
        <div className="mb-3">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
      )}
      {children && <div className="space-y-2">{children}</div>}
    </div>
  );

  return url ? <Link href={url}>{inner}</Link> : inner;
}
