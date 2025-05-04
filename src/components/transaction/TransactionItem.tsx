'use client';

import { TransactionDetailDTO } from '@/modules/transaction/types';
import { cn } from '@/lib/utils';
import CurrencyDisplay from '../ui/currency/CurrencyDisplay';
import SafeDynamicLucideIcon from '../ui/icon/SafeDynamicLucideIcon';

interface Props {
  tx: TransactionDetailDTO;
  onClick?: (tx: TransactionDetailDTO) => void;
  showTransferLabel?: boolean;
  className?: string;
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

  const renderAmount = () => (
    <CurrencyDisplay
      amount={tx.amount}
      type={tx.type}
      className={cn(
        'text-sm font-semibold',
        isIncome && 'text-green-600',
        isExpense && 'text-red-500',
        isTransfer && 'text-muted-foreground'
      )}
    />
  );

  const categoryLabel =
    isTransfer && showTransferLabel
      ? 'Transfer'
      : tx.category?.name ?? 'No category';

  const accountLabel = tx.account?.name ?? '';

  return (
    <li
      onClick={handleClick}
      className={cn(
        'bg-white rounded-xl shadow-sm px-4 py-3 flex items-center justify-between transition-colors cursor-pointer',
        className
      )}
    >
      {/* Left: Icon + Title/Meta */}
      <div className='flex items-center gap-3'>
        {/* Icon Circle */}
        <div className='w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xl'>
          <SafeDynamicLucideIcon
            name={'wallet'}
            className='w-4 h-4 text-muted-foreground'
          />
        </div>

        {/* Label Info */}
        <div className='flex flex-col'>
          <div className='text-sm font-medium text-foreground truncate'>
            {tx.note || categoryLabel}
          </div>
          <div className='text-xs text-muted-foreground truncate'>
            {categoryLabel} · {accountLabel}
          </div>
        </div>
      </div>

      {/* Right: Amount */}
      <div className='text-right'>{renderAmount()}</div>
    </li>
  );
}
