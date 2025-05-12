import { cn } from '@/lib/utils';

interface InsightRowProps {
  icon?: string;
  label: string;
  value: string;
  subtext?: string;
  variant?: 'default' | 'alert' | 'neutral';
  className?: string;
}

export function InsightRow({
  icon,
  label,
  value,
  subtext,
  variant = 'default',
  className,
}: InsightRowProps) {
  return (
    <div
      className={cn(
        'flex items-start justify-between rounded-md px-3 py-2 text-sm',
        variant === 'alert'
          ? 'bg-red-50 text-red-800'
          : 'bg-muted text-muted-foreground',
        className
      )}
    >
      <div>
        <div className='flex items-center gap-1 font-medium'>
          {icon && <span>{icon}</span>}
          {label}
        </div>
        {subtext && (
          <div className='text-xs text-muted-foreground'>{subtext}</div>
        )}
      </div>
      <div className='font-semibold tabular-nums text-foreground'>{value}</div>
    </div>
  );
}
