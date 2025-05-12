'use client';

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowRightLeft,
  LucideIcon,
  MinusIcon,
  PlusIcon,
} from 'lucide-react';
import { useUserSettingStore } from '@/stores/useUserSettingStore';
import { cn } from '@/lib/utils';

type IconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

const sizeMap: Record<IconSize, number> = {
  xxs: 8,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
};

interface CurrencyDisplayProps {
  amount: number;
  useSubCurrency?: boolean;
  locale?: string;
  showSymbolOnly?: boolean;
  className?: string;
  type?: 'income' | 'expense' | 'transfer' | 'total';
  icon?: LucideIcon;
  variant?: 'default' | 'group';
  iconSize?: IconSize;
}

export default function CurrencyDisplay({
  amount,
  useSubCurrency = false,
  locale = 'en-US',
  showSymbolOnly = false,
  className,
  type,
  icon: Icon,
  variant = 'default',
  iconSize = 'sm',
}: CurrencyDisplayProps) {
  const mainCurrency = useUserSettingStore((s) => s.mainCurrency);
  const subCurrency = useUserSettingStore((s) => s.subCurrency);
  const currencyCode = (useSubCurrency ? subCurrency : mainCurrency) || 'CAD';

  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol',
  }).format(amount);

  if (showSymbolOnly) {
    const symbol = formatted.replace(/\d|[.,\s]/g, '').trim();
    return <span className={className}>{symbol}</span>;
  }

  const resolvedIconSize = sizeMap[iconSize];

  const iconNode = Icon ? (
    <Icon size={resolvedIconSize} />
  ) : type === 'income' && variant === 'group' ? (
    <ArrowUpFromLine size={resolvedIconSize} />
  ) : type === 'expense' && variant === 'group' ? (
    <ArrowDownToLine size={resolvedIconSize} />
  ) : type === 'income' && variant === 'default' ? (
    <PlusIcon size={resolvedIconSize} />
  ) : type === 'expense' && variant === 'default' ? (
    <MinusIcon size={resolvedIconSize} />
  ) : type === 'transfer' ? (
    <ArrowRightLeft size={resolvedIconSize} />
  ) : null;

  const colorClass =
    type === 'income'
      ? 'text-primary'
      : type === 'expense'
      ? 'text-error'
      : type === 'transfer'
      ? 'text-muted'
      : type === 'total'
      ? 'text-foreground'
      : '';

  return (
    <span className={cn('inline-flex items-center', colorClass, className)}>
      {iconNode}
      {formatted}
    </span>
  );
}
