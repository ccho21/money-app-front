'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const CHART_COLOR_TOKENS = Array.from(
  { length: 30 },
  (_, i) => `--chart-${i + 1}`
);

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-12 h-8 p-0 border-2 rounded-md shadow-inner transition-colors',
            value ? 'border-muted' : 'border-dashed border-border'
          )}
          style={{ backgroundColor: value ? `var(${value})` : '#ffffff' }}
        />
      </PopoverTrigger>

      <PopoverContent className='w-[220px] grid grid-cols-6 gap-2 p-3'>
        {CHART_COLOR_TOKENS.map((token) => (
          <button
            key={token}
            type='button'
            onClick={() => onChange(token)}
            className={cn(
              'w-7 h-7 rounded-md border-2 relative transition-all',
              value === token ? 'border-ring' : 'border-transparent'
            )}
            style={{ backgroundColor: `var(${token})` }}
          >
            {value === token && (
              <Check className='absolute inset-1 text-white w-4 h-4' />
            )}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
