import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { format } from 'date-fns';

interface RecentTransaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  icon?: React.ReactNode;
}

interface RecentTransactionListProps {
  transactions?: RecentTransaction[];
  isLoading?: boolean;
  className?: string;
}

function formatAmount(amount: number, type: 'income' | 'expense') {
  const sign = type === 'income' ? '+' : '-';
  const formatted = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  }).format(amount);
  return `${sign}${formatted}`;
}

function RecentTransactionItem({ tx }: { tx: RecentTransaction }) {
  return (
    <div className='flex items-center justify-between py-2 border-b last:border-none'>
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm'>
          {tx.icon ??
            (tx.type === 'income' ? (
              <ArrowDown className='w-4 h-4 text-green-600' />
            ) : (
              <ArrowUp className='w-4 h-4 text-red-600' />
            ))}
        </div>
        <div>
          <p className='text-sm font-medium text-foreground'>{tx.title}</p>
          <p className='text-xs text-muted-foreground'>
            {format(new Date(tx.date), 'PPP')}
          </p>
        </div>
      </div>
      <p
        className={cn(
          'text-sm font-semibold',
          tx.type === 'income' ? 'text-green-600' : 'text-red-600'
        )}
      >
        {formatAmount(tx.amount, tx.type)}
      </p>
    </div>
  );
}

export default function RecentTransactionList({
  transactions = [],
  isLoading = false,
  className,
}: RecentTransactionListProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {isLoading && (
          <div className='space-y-2'>
            <Skeleton className='h-6 w-full' />
            <Skeleton className='h-6 w-full' />
          </div>
        )}

        {!isLoading && transactions.length === 0 && (
          <p className='text-sm text-muted-foreground'>
            No recent transactions found.
          </p>
        )}

        {!isLoading &&
          transactions.map((tx) => (
            <RecentTransactionItem key={tx.id} tx={tx} />
          ))}
      </CardContent>
    </Card>
  );
}
