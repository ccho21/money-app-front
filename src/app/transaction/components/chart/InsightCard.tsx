'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react'; // or use your own icon

interface Props {
  text: string;
}

export function InsightCard({ text }: Props) {
  return (
    <Alert variant='default' className='bg-muted'>
      <Lightbulb className='h-4 w-4' />
      <AlertDescription className='text-sm text-muted-foreground font-medium'>
        {text}
      </AlertDescription>
    </Alert>
  );
}
