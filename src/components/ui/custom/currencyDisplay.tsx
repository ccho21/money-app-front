'use client';

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowRightLeft,
  LucideIcon,
  MinusIcon,
  PlusIcon,
  Repeat,
} from 'lucide-react';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';
import { cn } from '@/modules/shared/lib/utils';

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
  isRecurring?: boolean;
  shortNumber?: boolean;
}

function formatShortCurrency(
  amount: number,
  currency: string,
  locale: string,
  unitPosition: 'front' | 'back'
): string {
  const abs = Math.abs(amount);
  const symbol = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(0)
    .replace(/0/g, '')
    .trim();

  const value =
    abs >= 1_000_000
      ? (amount / 1_000_000).toFixed(1) + 'M'
      : abs >= 1_000
      ? (amount / 1_000).toFixed(1) + 'K'
      : amount.toString();

  return unitPosition === 'front' ? `${symbol}${value}` : `${value}${symbol}`;
}

export default function CurrencyDisplay({
  amount,
  locale = 'en-US',
  showSymbolOnly = false,
  type,
  icon: Icon,
  variant = 'default',
  iconSize = 'sm',
  isRecurring = false,
  className,
  shortNumber = false,
}: CurrencyDisplayProps) {
  const mainCurrency = useUserSettingStore((s) => s.mainCurrency);
  const currencyCode = mainCurrency || 'CAD';
  const unitPosition = useUserSettingStore((s) => s.currencyUnitPosition);
  const decimalPlaces = useUserSettingStore((s) => s.currencyDecimalPlaces);

  const resolvedIconSize = sizeMap[iconSize];

  const getIconNode = () => {
    if (Icon) return <Icon size={resolvedIconSize} />;
    if (type === 'income')
      return variant === 'group' ? (
        <ArrowUpFromLine size={resolvedIconSize} />
      ) : (
        <PlusIcon size={resolvedIconSize} />
      );
    if (type === 'expense')
      return variant === 'group' ? (
        <ArrowDownToLine size={resolvedIconSize} />
      ) : (
        <MinusIcon size={resolvedIconSize} />
      );
    if (type === 'transfer') return <ArrowRightLeft size={resolvedIconSize} />;
    return null;
  };

  const iconNode = getIconNode();

  const colorClassMap: Record<
    NonNullable<CurrencyDisplayProps['type']>,
    string
  > = {
    income: 'text-primary',
    expense: 'text-foreground',
    transfer: 'text-muted',
    total: 'text-foreground',
  };

  const colorClass = type ? colorClassMap[type] : '';

  if (showSymbolOnly) {
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol',
    }).format(amount);
    const symbol = formatted.replace(/\d|[.,\s]/g, '').trim();
    return <span className={className}>{symbol}</span>;
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  let formatted = formatter.format(amount);

  // ⚠️ If position is 'back', swap the symbol to the end
  if (unitPosition === 'back') {
    const symbol = formatted.replace(/[\d.,\s]/g, '').trim();
    const numberOnly = formatted.replace(/[^\d.,\-]/g, '').trim();
    formatted = `${numberOnly}${symbol}`;
  }

  if (shortNumber) {
    formatted = formatShortCurrency(amount, currencyCode, locale, unitPosition);
  }

  return (
    <span
      className={cn('inline-flex items-center gap-0.5', colorClass, className)}
    >
      {iconNode} {formatted}
      {isRecurring && <Repeat size={12} />}
    </span>
  );
}
