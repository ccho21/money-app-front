'use client';

import { TransactionDetailDTO } from '@/modules/transaction/types';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components_backup/ui/card';
import UIIcon, { IconName } from '../../../components/ui/UIIcon';
import CurrencyDisplay from '../../../components/ui/custom/currencyDisplay';
import { Badge } from '@/components/ui/badge';

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
      <CardContent className='p-0 p-element flex items-center justify-between'>
        {/* Left: Icon + Labels */}
        <div className='flex items-center gap-element min-w-0'>
          <div className='w-[2rem] h-[2rem] rounded-full bg-muted flex items-center justify-center shrink-0'>
            <UIIcon
              name={(tx.category?.icon as IconName) ?? 'wallet'}
              className='size-[1.25rem]'
            />
          </div>
          <div className='flex flex-col min-w-0'>
            <div className='@card/[300px]:text-lg text-body font-medium text-foreground truncate'>
              {tx.note || categoryLabel}
            </div>
            <div className='flex gap-2 mt-0.5'>
              <Badge variant='outline' className='text-xs'>
                {categoryLabel}
              </Badge>
              {accountLabel && (
                <Badge variant='secondary' className='text-xs'>
                  {accountLabel}
                </Badge>
              )}
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
