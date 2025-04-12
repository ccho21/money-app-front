import Progress from '@/components/ui/Progress';
import { cn, formatCurrency } from '@/lib/utils';

interface CategoryListItemData {
  name: string;
  amount: number;
  rate?: number; // % 사용률 (있으면 프로그레스 바 표시)
  budget?: number; // 예산
  spent?: number; // 지출 (budget과 함께 쓰이면 예산 대비 지출 표시됨)
  startDate?: string;
  endDate?: string;
  color?: string;
  hasBudget?: boolean;
  balancePayable?: number;
  outstandingBalance?: number;
  isMatched?: boolean;
  showProgress: boolean;
}

export function CategoryListItem({
  name,
  amount,
  rate,
  budget,
  spent,
  startDate,
  endDate,
  color = '#ccc',
  balancePayable,
  outstandingBalance,
  isMatched = true,
  onClick,
  className,
  showProgress = true,
}: CategoryListItemData & {
  onClick: () => void;
  className?: string;
}) {
  const showCardInfo =
    balancePayable !== undefined || outstandingBalance !== undefined;

  return (
    <div
      onClick={onClick}
      className={cn(
        'px-3 py-3 border-b space-y-2 bg-surface',
        isMatched ? 'border-border' : 'border-error bg-red-50 dark:bg-red-950',
        className
      )}
    >
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          {color && (
            <div
              className='w-3 h-3 rounded-full'
              style={{ backgroundColor: color }}
            />
          )}
          <span className='text-sm font-medium text-foreground'>{name}</span>
        </div>
        <div className='text-sm font-semibold text-muted-foreground'>
          {formatCurrency(amount)}
        </div>
      </div>

      {showProgress && (
        <>
          <Progress value={rate!} startDate={startDate} endDate={endDate} />
          <div className='flex justify-between text-xs text-muted mt-1'>
            <span className='text-primary'>{formatCurrency(spent ?? 0)}</span>
            <span>{rate?.toFixed(1)}%</span>
            <span>{formatCurrency((budget ?? 0) - (spent ?? 0))}</span>
          </div>
        </>
      )}

      {showCardInfo && (
        <div className='space-y-1 text-xs text-muted mt-2'>
          {balancePayable !== undefined && (
            <div className='flex justify-between'>
              <span>Balance Payable</span>
              <span>{formatCurrency(balancePayable)}</span>
            </div>
          )}
          {outstandingBalance !== undefined && (
            <div className='flex justify-between'>
              <span>Outstanding Balance</span>
              <span>{formatCurrency(outstandingBalance)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
