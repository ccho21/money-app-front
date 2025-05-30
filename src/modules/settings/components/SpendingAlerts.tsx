import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, TrendingUp } from 'lucide-react';

const alerts = [
  {
    icon: (
      <AlertTriangle
        className='icon-sm'
        style={{ color: 'var(--color-destructive)' }}
      />
    ),
    title: 'Dining spending surged 3 days in a row',
    description: 'This week’s dining expense is 78% higher than your average.',
  },
  {
    icon: (
      <TrendingUp
        className='icon-sm'
        style={{ color: 'var(--color-warning)' }}
      />
    ),
    title: 'Shopping increased by 85% from last month',
    description: 'Detected as an irregular spending pattern.',
  },
];

export function SpendingAlerts() {
  return (
    <div className='grid gap-element'>
      {alerts.map((alert, index) => (
        <Alert key={index} className='flex items-start gap-element'>
          {alert.icon}
          <div>
            <AlertTitle className='text-label font-semibold'>
              {alert.title}
            </AlertTitle>
            <AlertDescription className='text-caption text-muted-foreground'>
              {alert.description}
            </AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  );
}
