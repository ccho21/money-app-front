'use client';

import dynamic from 'next/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

type IconName = keyof typeof dynamicIconImports;

function normalizeIconName(name: string): IconName {
  return name.trim().toLowerCase().replace(/\s+/g, '-') as IconName;
}

export default function UIIcon({
  name,
  className,
  ...props
}: {
  name: string;
  className?: string;
} & LucideProps) {
  const normalized = normalizeIconName(name);
  const DynamicIcon = dynamic(dynamicIconImports[normalized], { ssr: false });

  return <DynamicIcon className={cn('w-5 h-5', className)} {...props} />;
}
