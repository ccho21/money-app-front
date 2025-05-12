import { Card, CardContent, CardHeader } from '@/components_backup/ui/card';
import CurrencyDisplay from '@/components_backup/ui/currency/CurrencyDisplay';
import { cn } from '@/lib/utils';

interface CategoryListItemData {
  name: string;
  amount?: number;
  rate?: number;
  budget?: number;
  startDate?: string;
  endDate?: string;
  color?: string;
  hasBudget?: boolean;
  balancePayable?: number;
  outstandingBalance?: number;
  isMatched?: boolean;
  showProgress?: boolean;
}

export function CategoryListItem({
  name,
  amount,
  color = '#ccc',
  balancePayable,
  outstandingBalance,
  onClick,
  className,
}: CategoryListItemData & {
  onClick: () => void;
  className?: string;
}) {
  const showCardInfo =
    balancePayable !== undefined || outstandingBalance !== undefined;

  return (
    <Card onClick={onClick} className={cn('cursor-pointer mb-compact', className)}>
      <CardContent className='space-y-element'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div
              className='w-2.5 h-2.5 rounded-full border border-border shrink-0'
              style={{ backgroundColor: color }}
            />
            <span className='text-body font-medium text-foreground truncate'>
              {name}
            </span>
          </div>
          <CurrencyDisplay
            amount={amount ?? 0}
            className='text-body font-semibold text-foreground'
          />
        </div>

        {/* Optional card info */}
        {showCardInfo && (
          <div className='pt-tight text-caption text-muted-foreground space-y-tight border-t border-border mt-element'>
            {balancePayable !== undefined && (
              <div className='flex justify-between'>
                <span>Balance Payable</span>
                <CurrencyDisplay amount={balancePayable} />
              </div>
            )}
            {outstandingBalance !== undefined && (
              <div className='flex justify-between'>
                <span>Outstanding Balance</span>
                <CurrencyDisplay amount={outstandingBalance} />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
