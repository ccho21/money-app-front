import { TransactionGroupSummary } from '@/modules/transaction/types/types';
import CurrencyDisplay from '../../components_backup/ui/currency/CurrencyDisplay';
import { cn } from '@/lib/utils';

interface SummaryBoxProps {
  summary: TransactionGroupSummary;
  onClick?: () => void;
  className?: string;
}

export default function SummaryBox({
  summary,
  onClick,
  className,
}: SummaryBoxProps) {
  const {
    totalIncome,
    totalExpense,
    netBalance,
    comparison,
    topSpendingCategory,
  } = summary;

  return (
    <section
      onClick={onClick}
      className={cn('px-4 pb-4 mb-4 space-y-2 border-b border-gray-100', className)}
    >
      {/* 🟥 Total Spending */}
      <div className='space-y-1'>
        <p className='text-xs text-muted-foreground uppercase tracking-wide'>
          Total Spending
        </p>
        <h2 className='text-3xl font-bold tracking-tight text-primary'>
          <CurrencyDisplay amount={totalExpense} />
        </h2>
        {comparison && (
          <p className='text-xs text-muted-foreground font-medium'>
            ↑ <CurrencyDisplay amount={comparison.difference} /> ({comparison.percent}%) from last month
          </p>
        )}
      </div>

      {/* 🟢 Income / Net */}
      <div className='grid grid-cols-2 gap-3 text-sm'>
        <div>
          <p className='text-muted-foreground'>Income</p>
          <p className='text-green-600 font-bold'>
            <CurrencyDisplay amount={totalIncome} />
          </p>
        </div>
        <div className='text-right'>
          <p className='text-muted-foreground'>Net Balance</p>
          <p className='text-gray-900 font-bold'>
            <CurrencyDisplay amount={netBalance} />
          </p>
        </div>
      </div>

      {/* 🟡 Top Spending */}
      {topSpendingCategory && (
        <div className='flex justify-between text-xs text-muted-foreground pt-1'>
          <span>
            Top: {topSpendingCategory.name}{' '}
            <CurrencyDisplay amount={topSpendingCategory.amount} />
          </span>
          <a href='#' className='text-blue-600 hover:underline font-medium'>
            View summary →
          </a>
        </div>
      )}
    </section>
  );
}
