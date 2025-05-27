'use client';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Insight } from '@/modules/insights/types/types';
import { AlertTriangle, PiggyBank } from 'lucide-react';

interface BudgetSummaryCardsProps {
  insights: Insight[];
}

const formatCAD = (amount: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount);

export function BudgetSummaryCards({ insights }: BudgetSummaryCardsProps) {
  return (
    <div className="grid gap-element">
      {insights.map((insight) => {
        const isOver = insight.severity === 'warning' || insight.severity === 'critical';
        const icon = isOver ? (
          <AlertTriangle className="icon-sm text-destructive" />
        ) : (
          <PiggyBank className="icon-sm text-primary" />
        );

        const context = insight.context ?? {};
        const categoryName =
          insight.entityRef?.type ?? insight.entityRef?.id?.slice(0, 6) ?? 'Unknown';

        const percentOver = context.percentOver;
        const savedAmount = context.saved ?? context.remaining;

        const description =
          insight.description ||
          (isOver && typeof percentOver === 'number'
            ? `You've spent ${percentOver}% over budget in ${categoryName}.`
            : !isOver && typeof savedAmount === 'number'
            ? `You saved ${formatCAD(savedAmount)} in ${categoryName}.`
            : '');

        return (
          <Alert
            key={insight.id}
            variant={isOver ? 'destructive' : 'default'}
            className="flex items-start gap-element px-component py-element rounded-lg"
            role="alert"
          >
            {icon}
            <div className="space-y-tight">
              <AlertTitle className="text-label font-semibold">
                {insight.title}
              </AlertTitle>
              <AlertDescription className="text-caption text-muted-foreground">
                {description}
              </AlertDescription>
            </div>
          </Alert>
        );
      })}
    </div>
  );
}
