'use client';

import { TransactionDetailDTO } from '@/modules/transaction/types';
import { cn } from '@/lib/utils';
import CurrencyDisplay from '../ui/currency/CurrencyDisplay';
import SafeDynamicLucideIcon from '../ui/icon/SafeDynamicLucideIcon';
import { Card, CardContent } from '@/components/ui/card';

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
        'text-sm font-semibold tracking-tight',
        isIncome && 'text-success',
        isExpense && 'text-error',
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
    <Card
      onClick={handleClick}
      className={cn('cursor-pointer transition-colors p-0', className)}
    >
      <CardContent className='p-component flex items-center justify-between gap-element'>
        {/* Left: Icon + Label */}
        <div className='flex items-center gap-element min-w-0'>
          <div className='w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0'>
            <SafeDynamicLucideIcon
              name='wallet'
              className='w-4 h-4 text-foreground'
            />
          </div>
          <div className='flex flex-col min-w-0'>
            <div className='text-sm font-medium text-foreground truncate'>
              {tx.note || categoryLabel}
            </div>
            <div className='text-xs text-muted-foreground truncate'>
              {categoryLabel} · {accountLabel}
            </div>
          </div>
        </div>

        {/* Right: Amount */}
        <div className='text-right shrink-0'>{renderAmount()}</div>
      </CardContent>
    </Card>
  );
}
