'use client';

import dynamic from 'next/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import type { LucideProps } from 'lucide-react';
import { useRef } from 'react';

type IconName = keyof typeof dynamicIconImports;

function normalizeIconName(name: string): IconName {
  return name.trim().toLowerCase().replace(/\s+/g, '-') as IconName;
}

// ✅ 명확한 타입 지정
const iconComponentMap: Record<string, React.ComponentType<LucideProps>> = {};

export default function SafeDynamicLucideIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const normalized = normalizeIconName(name);
  const importer = dynamicIconImports[normalized];

  const IconRef = useRef(() => {
    if (!importer) return null;
    if (!iconComponentMap[normalized]) {
      // ⛳️ 제네릭 지정!
      iconComponentMap[normalized] = dynamic<LucideProps>(importer);
    }
    return iconComponentMap[normalized];
  });

  const Icon = IconRef.current();
  if (!Icon) return null;
  return <Icon className={className} />;
}
