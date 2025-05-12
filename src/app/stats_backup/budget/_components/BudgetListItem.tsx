import { Card, CardContent } from '@/components_backup/ui/card';
import CurrencyDisplay from '@/components_backup/ui/currency/CurrencyDisplay';
import ProgressWithToday from '@/components_backup/ui/progress/ProgressWithToday';
import { cn } from '@/lib/utils';

interface BudgetListItemData {
  name: string;
  rate: number;
  label: string;
  budget: number;
  amount: number;
  rangeStart: string;
  rangeEnd: string;
  hasBudget: boolean;
}

export function BudgetListItem({
  name,
  label,
  budget,
  amount,
  hasBudget,
  onClick,
  className,
}: BudgetListItemData & {
  onClick: () => void;
  className?: string;
}) {
  const remaining = (budget ?? 0) - (amount ?? 0);
  const isOver = remaining < 0;

  return (
    <Card
      onClick={onClick}
      className={cn('cursor-pointer transition hover:bg-muted/10', className)}
    >
      <CardContent className='space-y-tight'>
        {hasBudget ? (
          <>
            {/* Header */}
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-caption text-muted-foreground'>{label}</p>
                <h4 className='text-body font-semibold text-foreground'>
                  <CurrencyDisplay amount={budget ?? 0} />
                </h4>
              </div>
              <div className='text-label font-medium text-foreground truncate'>
                {name}
              </div>
            </div>

            {/* Progress */}
            <div className='pt-tight'>
              <ProgressWithToday
                value={87.3}
                startDate='2025-05-01'
                endDate='2025-05-31'
                label='Today'
              />
            </div>

            {/* Footer */}
            <div className='flex justify-between text-caption mt-tight'>
              <span className='text-primary'>
                <CurrencyDisplay amount={amount ?? 0} />
              </span>
              <span
                className={cn(
                  isOver ? 'text-destructive' : 'text-muted-foreground'
                )}
              >
                <CurrencyDisplay amount={remaining} />
              </span>
            </div>
          </>
        ) : (
          <div className='flex justify-between items-center'>
            <span className='text-label font-medium text-foreground truncate'>
              {name}
            </span>
            <span className='text-label text-muted-foreground'>
              <CurrencyDisplay amount={amount ?? 0} />
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
