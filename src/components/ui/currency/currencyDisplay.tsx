'use client';

import { ArrowRightLeft, MinusIcon, PlusIcon, Repeat } from 'lucide-react';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';
import { cn } from '@/modules/shared/util/style.utils';
interface CurrencyDisplayProps {
  amount: number;
  useSubCurrency?: boolean;
  locale?: string;
  showSymbolOnly?: boolean;
  className?: string;
  type?: 'income' | 'expense' | 'transfer' | 'total';
  iconSize?: number;
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
  iconSize = 8,
  isRecurring = false,
  className,
  shortNumber = false,
}: CurrencyDisplayProps) {
  const mainCurrency = useUserSettingStore((s) => s.mainCurrency);
  const currencyCode = mainCurrency || 'CAD';
  const unitPosition = useUserSettingStore((s) => s.currencyUnitPosition);
  const decimalPlaces = useUserSettingStore((s) => s.currencyDecimalPlaces);

  const getIconNode = () => {
    const sizeStyle = { width: iconSize, height: iconSize };

    if (type === 'income') return <PlusIcon style={sizeStyle} />;
    if (type === 'expense') return <MinusIcon style={sizeStyle} />;
    if (type === 'transfer') return <ArrowRightLeft style={sizeStyle} />;
    return null;
  };

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

  // 단위 위치 조정
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
      {getIconNode()} {formatted}
      {isRecurring && <Repeat size={12} />}
    </span>
  );
}
