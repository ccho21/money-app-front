'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BadgeAlert, CreditCard } from 'lucide-react';

export function ActionCards() {
  const router = useRouter();

  return (
    <div className="grid gap-component">
      {/* 🟥 Budget Alert */}
      <Alert
        variant="destructive"
        className="flex items-start justify-between gap-element px-component py-element rounded-lg"
      >
        <div className="flex-1 space-y-tight">
          <div className="flex items-center gap-element">
            <BadgeAlert className="w-icon text-destructive" />
            <AlertTitle className="text-label font-semibold">
              Some categories exceeded their budget
            </AlertTitle>
          </div>
          <AlertDescription className="text-caption text-muted-foreground">
            Consider adjusting next month’s budget.
          </AlertDescription>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push('/budget/list')}
        >
          Adjust Budget
        </Button>
      </Alert>

      {/* 🟡 Recurring Expense Alert */}
      <Alert
        variant="default"
        className="flex items-start justify-between gap-element px-component py-element rounded-lg"
      >
        <div className="flex-1 space-y-tight">
          <div className="flex items-center gap-element">
            <CreditCard className="w-icon text-muted-foreground" />
            <AlertTitle className="text-label font-semibold">
              Increase in recurring payments
            </AlertTitle>
          </div>
          <AlertDescription className="text-caption text-muted-foreground">
            Reviewing your fixed expenses can help clarify your budget.
          </AlertDescription>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push('/insights/recurring')}
        >
          Review Recurring
        </Button>
      </Alert>
    </div>
  );
}
