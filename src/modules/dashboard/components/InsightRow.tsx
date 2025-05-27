import { cn } from '@/modules/shared/lib/utils';
import { AlertTriangle, Info, AlertOctagon, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Insight } from '@/modules/insights/types/types';

// 시스템 색상 토큰 기반
const severityStyles: Record<Insight['severity'], string> = {
  info: 'bg-accent/20 text-accent-foreground',
  warning: 'bg-warning/10 text-warning', // warning은 tailwind.config 확장 필요
  critical: 'bg-destructive/10 text-destructive',
};

const severityIcons: Record<Insight['severity'], LucideIcon> = {
  info: Info,
  warning: AlertTriangle,
  critical: AlertOctagon,
};

interface InsightRowProps {
  insight: Insight;
  onActionClick?: (id: string) => void;
  className?: string;
}

export function InsightRow({
  insight,
  onActionClick,
  className,
}: InsightRowProps) {
  const { id, title, description, severity, context, actionLabel } = insight;
  const SeverityIcon = severityIcons[severity];

  return (
    <section
      className={cn(
        'flex flex-col gap-element rounded-lg border border-border px-component py-element shadow-sm',
        severityStyles[severity],
        className
      )}
      role='region'
      aria-labelledby={`insight-title-${id}`}
    >
      <div className='flex items-start justify-between gap-element'>
        <div className='flex items-start gap-element'>
          <SeverityIcon className='w-icon h-icon mt-0.5 shrink-0' />
          <div>
            <h3
              id={`insight-title-${id}`}
              className='text-label font-medium'
            >
              {title}
            </h3>
            <p className='text-caption text-muted-foreground'>
              {description}
            </p>
          </div>
        </div>
        {actionLabel && (
          <Button
            size='sm'
            variant='outline'
            className='text-label'
            onClick={() => onActionClick?.(id)}
          >
            {actionLabel}
          </Button>
        )}
      </div>

      {/* Future context block */}
      {/* {context && (
        <div className="grid grid-cols-2 gap-1 text-caption text-muted-foreground mt-element">
          {Object.entries(context).map(([key, val]) => (
            <div key={key} className="flex justify-between">
              <span className="capitalize">{key}:</span>
              <span className="tabular-nums">{val}</span>
            </div>
          ))}
        </div>
      )} */}
    </section>
  );
}
