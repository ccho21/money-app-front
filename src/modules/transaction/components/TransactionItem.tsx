'use client';

import { cn } from '@/lib/utils';
import UIIcon, { IconName } from '@/components/ui/UIIcon';
import { format } from 'date-fns';
import { TransactionItem as TxDTO } from '../types/types';
import CurrencyDisplay from '@/components/ui/custom/currencyDisplay';

interface Props {
  tx: TxDTO;
  onClick?: (tx: TxDTO) => void;
  showTransferLabel?: boolean;
  className?: string;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function TransactionItem({
  tx,
  onClick,
  showTransferLabel = true,
  className,
}: Props) {
  const isIncome = tx.type === 'income';
  const isExpense = tx.type === 'expense';
  const isTransfer = tx.type === 'transfer';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(tx);
  };

  const iconVar = tx.category?.color ?? '--color-chart-1'; // fallback 지정
  const iconColor = `var(${iconVar})`;
  const iconBgColor = `color-mix(in srgb, var(${iconVar}) 15%, transparent)`; // 약간의 투명 배경

  const amountClass = isIncome
    ? 'text-green-600'
    : isExpense
    ? 'text-foreground'
    : 'text-gray-500';

  const categoryLabel =
    isTransfer && showTransferLabel
      ? 'Transfer'
      : tx.category?.name ?? 'Uncategorized';

  const accountLabel = tx.account?.name ?? '';
  const subtitle = [categoryLabel, accountLabel].filter(Boolean).join(' · ');

  return (
    <li
      onClick={handleClick}
      className={cn(
        'flex items-center justify-between bg-gray-50 px-3 py-3 rounded-xl cursor-pointer',
        className
      )}
    >
      <div className='flex items-center gap-3'>
        <div
          className='p-2 rounded-full'
          style={{ backgroundColor: iconBgColor }}
        >
          <UIIcon
            name={
              (tx.category?.icon as IconName) ||
              (tx.title === 'Opening Balance' ? 'coins' : 'tag') // fallback
            }
            className='w-5 h-5'
            style={{ color: iconColor }}
          />
        </div>

        <div>
          <p className='text-sm font-medium text-gray-900 truncate'>
            {tx.title || categoryLabel}
          </p>
          <p className='text-xs text-muted-foreground'>{subtitle}</p>
        </div>
      </div>
      <div className={cn('text-sm text-right', amountClass)}>
        {isIncome ? (
          <CurrencyDisplay
            type='income'
            variant='default'
            amount={tx.amount}
          ></CurrencyDisplay>
        ) : (
          <CurrencyDisplay
            type='expense'
            variant='default'
            amount={tx.amount}
          ></CurrencyDisplay>
        )}
        <div className='text-xs text-muted-foreground'>
          {format(new Date(tx.date), 'hh:mm a')}
        </div>
      </div>
    </li>
  );
}
