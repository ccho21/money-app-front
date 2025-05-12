'use client';

import { TransactionDetailDTO } from '@/modules/transaction/types';
import { cn } from '@/lib/utils';
import CurrencyDisplay from '../ui/currency/CurrencyDisplay';
import { Card, CardContent } from '@/components_backup/ui/card';
import UIIcon, { IconName } from '../ui/UIIcon';
import { LucideProps } from 'lucide-react';

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
        'text-label font-semibold tracking-tight',
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
      className={cn(
        '@container/card cursor-pointer transition-colors rounded-2xl p-0 hover:bg-muted/10',
        className
      )}
    >
      <CardContent className='p-element flex items-center justify-between gap-element'>
        {/* Left: Icon + Labels */}
        <div className='flex items-center gap-element min-w-0'>
          <div className='w-[2.25rem] h-[2.25rem] rounded-full bg-muted flex items-center justify-center shrink-0'>
            <UIIcon
              name={(tx.category?.icon as IconName) ?? 'wallet'}
              className='size-[1.25rem]'
            />
          </div>
          <div className='flex flex-col min-w-0'>
            <div className='@card/[300px]:text-lg text-body font-medium text-foreground truncate'>
              {tx.note || categoryLabel}
            </div>
            <div className='@card/[300px]:text-sm text-caption text-muted-foreground truncate'>
              {categoryLabel} · {accountLabel}
            </div>
          </div>
        </div>

        {/* Right: Amount */}
        <div className='@card/[300px]:text-base text-sm text-right font-semibold shrink-0'>
          {renderAmount()}
        </div>
      </CardContent>
    </Card>
  );
}
