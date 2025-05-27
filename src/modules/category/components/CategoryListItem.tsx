import { Card, CardContent } from '@/components/ui/card';
import CurrencyDisplay from '@/components/ui/custom/currencyDisplay';
import { cn } from '@/modules/shared/lib/utils';

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
    <Card
      onClick={onClick}
      className={cn(
        'cursor-pointer hover:bg-muted/5 transition-colors mb-compact',
        className
      )}
      role="listitem"
    >
      <CardContent className="space-y-element">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-element">
            <div
              className="w-2.5 h-2.5 rounded-full border border-border shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-body font-medium text-foreground truncate">
              {name}
            </span>
          </div>
          <CurrencyDisplay
            amount={amount ?? 0}
            className="text-body font-semibold text-foreground"
          />
        </div>

        {/* Optional card info */}
        {showCardInfo && (
          <div className="pt-tight mt-element border-t border-border space-y-tight text-caption text-muted-foreground">
            {balancePayable !== undefined && (
              <div className="flex justify-between">
                <span className="text-caption">Balance Payable</span>
                <CurrencyDisplay amount={balancePayable} className="text-caption" />
              </div>
            )}
            {outstandingBalance !== undefined && (
              <div className="flex justify-between">
                <span className="text-caption">Outstanding Balance</span>
                <CurrencyDisplay amount={outstandingBalance} className="text-caption" />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
