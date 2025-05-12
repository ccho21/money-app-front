import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, TrendingUp } from 'lucide-react';

const alerts = [
  {
    icon: <AlertTriangle className='h-4 w-4 text-red-500' />,
    title: 'Dining spending surged 3 days in a row',
    description: 'This week’s dining expense is 78% higher than your average.',
  },
  {
    icon: <TrendingUp className='h-4 w-4 text-yellow-500' />,
    title: 'Shopping increased by 85% from last month',
    description: 'Detected as an irregular spending pattern.',
  },
];

export function SpendingAlerts() {
  return (
    <div className='grid gap-3'>
      {alerts.map((alert, index) => (
        <Alert key={index} className='flex items-start gap-3'>
          {alert.icon}
          <div>
            <AlertTitle className='text-base font-semibold'>
              {alert.title}
            </AlertTitle>
            <AlertDescription className='text-sm text-gray-600'>
              {alert.description}
            </AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  );
}
