// src/components/ui/UIIcon.tsx
import { LucideProps } from 'lucide-react';
import { iconMap, IconName } from '@/modules/shared/util/icon.utils';
import { cn } from '@/modules/shared/util/style.utils';
interface UIIconProps extends LucideProps {
  name: IconName;
  className?: string;
}

export default function UIIcon({ name, className, ...props }: UIIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;

  return <Icon className={cn('w-5 h-5', className)} {...props} />;
}

