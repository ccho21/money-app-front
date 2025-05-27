import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Insight } from '@/modules/insights/types/types';
import {
  Lightbulb,
  Info,
  AlertTriangle,
} from 'lucide-react';

interface Props {
  insight: Insight;
}

export function InsightCard({ insight }: Props) {
  const { title, description, severity } = insight;

  const iconMap = {
    critical: <AlertTriangle className="icon-sm text-destructive mr-element shrink-0" />,
    warning: <Lightbulb className="icon-sm text-warning mr-element shrink-0" />,
    info: <Info className="icon-sm text-muted-foreground mr-element shrink-0" />,
  };

  return (
    <Alert variant="default" className="flex items-start px-component py-element">
      {iconMap[severity] || iconMap.info}
      <div className="space-y-tight">
        <AlertTitle className="text-label font-medium text-foreground">
          {title}
        </AlertTitle>
        <AlertDescription className="text-caption text-muted-foreground">
          {description}
        </AlertDescription>
      </div>
    </Alert>
  );
}
