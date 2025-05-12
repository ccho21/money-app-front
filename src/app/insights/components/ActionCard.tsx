'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BadgeAlert, CreditCard } from 'lucide-react';

export function ActionCards() {
  const router = useRouter();

  return (
    <div className='grid gap-4'>
      {/* Budget Alert */}
      <Alert
        variant='destructive'
        className='flex justify-between items-center gap-4'
      >
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <BadgeAlert className='h-4 w-4 text-destructive' />
            <AlertTitle className='text-sm font-semibold'>
              Some categories exceeded their budget
            </AlertTitle>
          </div>
          <AlertDescription className='text-sm text-muted-foreground mt-1'>
            Consider adjusting next month’s budget.
          </AlertDescription>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => router.push('/budget/list')}
        >
          Adjust Budget
        </Button>
      </Alert>

      {/* Recurring Expense Alert */}
      <Alert
        variant='default'
        className='flex justify-between items-center gap-4'
      >
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
            <AlertTitle className='text-sm font-semibold'>
              Increase in recurring payments
            </AlertTitle>
          </div>
          <AlertDescription className='text-sm text-muted-foreground mt-1'>
            Reviewing your fixed expenses can help clarify your budget.
          </AlertDescription>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => router.push('/insights/recurring')}
        >
          Review Recurring
        </Button>
      </Alert>
    </div>
  );
}
