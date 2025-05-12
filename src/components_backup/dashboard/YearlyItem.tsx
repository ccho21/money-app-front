'use client';

import { format, parse, isValid, startOfYear, endOfYear } from 'date-fns';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components_backup/ui/card';
import { Button } from '@/components_backup/ui/button';
import { DollarSign, CreditCard } from 'lucide-react';

interface YearlyItemProps {
  date: string;
  income: number;
  expense: number;
  onClick: () => void;
}

export default function YearlyItem({
  date,
  income,
  expense,
  onClick,
}: YearlyItemProps) {
  const parsedDate = useMemo(() => {
    try {
      const d = parse(date, 'yyyy', new Date());
      return isValid(d) ? d : null;
    } catch {
      return null;
    }
  }, [date]);

  if (!parsedDate) return null;

  const label = format(parsedDate, 'yyyy');
  const start = format(startOfYear(parsedDate), 'MM-dd');
  const end = format(endOfYear(parsedDate), 'MM-dd');
  const total = income - expense;

  return (
    <Card
      onClick={onClick}
      className={cn(
        'cursor-pointer hover:shadow-md transition-shadow border border-border rounded-xl bg-card text-foreground'
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-body font-semibold">{label}</CardTitle>
        <CardDescription className="text-caption text-muted-foreground">
          {start} ~ {end}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between items-end px-6 pb-4 text-label font-medium">
        <div className="flex flex-col gap-tight text-success">
          <div className="flex items-center gap-tight">
            <DollarSign className="size-4" />
            <span>${income.toLocaleString()}</span>
          </div>
          <span className="text-caption text-muted-foreground">Income</span>
        </div>
        <div className="flex flex-col gap-tight text-error">
          <div className="flex items-center gap-tight">
            <CreditCard className="size-4" />
            <span>${expense.toLocaleString()}</span>
          </div>
          <span className="text-caption text-muted-foreground">Expense</span>
        </div>
        <div className="flex flex-col gap-tight text-foreground text-right">
          <span className="text-[1.125rem] font-semibold">${total.toLocaleString()}</span>
          <span className="text-caption text-muted-foreground">Total</span>
        </div>
      </CardFooter>
    </Card>
  );
}
