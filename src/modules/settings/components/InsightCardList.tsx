'use client';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Utensils,
  Calendar,
  ShoppingBag,
  AlertTriangle,
  PiggyBank,
  Info,
} from 'lucide-react';
import { JSX } from 'react';
import { Insight } from '@/modules/insights/types/types';

interface InsightCardListProps {
  insights: Insight[];
}

export function InsightCardList({ insights }: InsightCardListProps) {
  return (
    <div className="grid gap-element">
      {insights.map((insight) => (
        <Alert
          key={insight.id}
          variant={mapSeverityToVariant(insight.severity)}
          role="alert"
          className="flex items-start gap-element px-component py-element"
        >
          {renderIcon(insight.icon ?? insight.type, insight.severity)}
          <div className="space-y-tight">
            <AlertTitle className="text-label font-medium">
              {insight.title}
            </AlertTitle>
            <AlertDescription className="text-caption text-muted-foreground">
              {insight.description}
            </AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  );
}

// ✅ Severity to variant mapping
function mapSeverityToVariant(severity: Insight['severity']): 'default' | 'destructive' {
  return severity === 'critical' || severity === 'warning' ? 'destructive' : 'default';
}

// ✅ Icon rendering with semantic sizing
function renderIcon(iconType: string, severity: Insight['severity']): JSX.Element {
  const className = severity === 'critical'
    ? 'icon-sm text-destructive'
    : 'icon-sm text-muted-foreground';

  const map: Record<string, JSX.Element> = {
    utensils: <Utensils className={className} />,
    calendar: <Calendar className={className} />,
    shopping: <ShoppingBag className={className} />,
    piggy: <PiggyBank className={className} />,
    alert: <AlertTriangle className={className} />,
  };

  return map[iconType] ?? (
    severity === 'critical'
      ? <AlertTriangle className={className} />
      : <Info className={className} />
  );
}
