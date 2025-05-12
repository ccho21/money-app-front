import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface BudgetOveruseAlertProps {
  overCount: number;
  amount?: string; // already formatted like "$120.00"
  message?: string;
}

export function BudgetOveruseAlert({
  overCount,
  amount,
  message,
}: BudgetOveruseAlertProps) {
  return (
    <Alert variant='destructive'>
      <AlertTriangle className='h-4 w-4' />
      <div className='space-y-1'>
        <AlertTitle>
          Budget Overuse Alert: {overCount}{' '}
          {overCount === 1 ? 'category' : 'categories'} over
        </AlertTitle>
        <AlertDescription>
          {message ?? 'Some categories have exceeded their budget.'}
          {amount && (
            <span className='ml-1 font-medium'>Total Over: {amount}</span>
          )}
        </AlertDescription>
      </div>
    </Alert>
  );
}
