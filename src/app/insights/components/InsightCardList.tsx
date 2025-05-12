'use client';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Utensils, Calendar, ShoppingBag } from 'lucide-react';

const insightItems = [
  {
    icon: <Utensils className='h-4 w-4 text-destructive' />,
    title: 'Dining budget exceeded',
    description: 'You’ve spent 24% more than your dining budget this month.',
    variant: 'destructive',
  },
  {
    icon: <Calendar className='h-4 w-4 text-muted-foreground' />,
    title: 'Weekend spending spike',
    description: '65% of your spending occurred on Saturday and Sunday.',
    variant: 'default',
  },
  {
    icon: <ShoppingBag className='h-4 w-4 text-muted-foreground' />,
    title: 'Late-night shopping habit',
    description: '30% of shopping transactions happened after 9 PM.',
    variant: 'default',
  },
];

export function InsightCardList() {
  return (
    <div className='grid gap-3'>
      {insightItems.map((item, index) => (
        <Alert key={index} variant={item.variant}>
          {item.icon}
          <div className='space-y-1'>
            <AlertTitle className='text-sm font-medium'>
              {item.title}
            </AlertTitle>
            <AlertDescription className='text-sm text-muted-foreground'>
              {item.description}
            </AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  );
}
