'use client';

import { useUserSettingStore } from '@/stores/useUserSettingStore';

interface CurrencyDisplayProps {
  amount: number;
  useSubCurrency?: boolean;
  locale?: string; // 기본 'en-US'
  showSymbolOnly?: boolean; // true면 "$"만 출력
  className?: string;
}

export default function CurrencyDisplay({
  amount,
  useSubCurrency = false,
  locale = 'en-US',
  showSymbolOnly = false,
  className,
}: CurrencyDisplayProps) {
  const mainCurrency = useUserSettingStore((s) => s.mainCurrency);
  const subCurrency = useUserSettingStore((s) => s.subCurrency);

  const selectedCurrency = useSubCurrency
    ? subCurrency || mainCurrency
    : mainCurrency;

  // fallback
  const currencyCode = selectedCurrency || 'USD';

  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol',
  }).format(amount);

  if (showSymbolOnly) {
    const symbol = formatted.replace(/\d|[.,\s]/g, '').trim();
    return <span className={className}>{symbol}</span>;
  }

  return <span className={className}>{formatted}</span>;
}
