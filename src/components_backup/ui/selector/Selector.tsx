'use client';

import { ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components_backup/ui/drawer';
import { Button } from '@/components_backup/ui/button';
import { cn } from '@/lib/utils';
import { useConditionalRender } from '@/hooks/useConditionalRender';
import { IconName } from '@/lib/iconMap';
import UIIcon from '@/components/ui/UIIcon';

interface SelectorProps<T> {
  value: string;
  label: string;
  onChange: (val: string) => void;
  options: T[];
  getOptionLabel: (item: T) => string;
  getOptionValue: (item: T) => string;
  getOptionIcon?: (item: T) => IconName;
  getOptionColor?: (item: T) => string;
  onEdit?: () => void;
  className?: string;
}

export default function Selector<T>({
  value,
  label,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  getOptionIcon,
  getOptionColor,
  onEdit,
  className,
}: SelectorProps<T>) {
  const [open, setOpen] = useState(false);
  const shouldRender = useConditionalRender(open); // 기본 delay 0

  return (
    <div
      className={cn(`app-wrapper ${className}`)}
      {...(open ? { inert: true } : {})}
    >
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            type='button'
            variant='outline'
            className='w-full justify-between text-left'
          >
            <span className='truncate'>{value}</span>
            <ChevronDown className='w-4 h-4 text-muted-foreground' />
          </Button>
        </DrawerTrigger>

        {shouldRender && (
          <DrawerContent className='pb-5' aria-describedby={undefined}>
            <DrawerHeader className='border-b border-border py-2'>
              <div className='flex items-center justify-between'>
                <DrawerTitle className='text-md'>{label}</DrawerTitle>
                {onEdit && (
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={onEdit}
                    title='Add'
                  >
                    <Plus className='w-4 h-4 text-muted-foreground' />
                  </Button>
                )}
              </div>
            </DrawerHeader>

            <div className='grid grid-cols-2 gap-3 px-4 py-4'>
              {options.map((item, idx) => {
                const isSelected = getOptionValue(item) === value;
                const color = getOptionColor?.(item);

                return (
                  <Button
                    key={idx}
                    type='button'
                    variant={isSelected ? 'default' : 'ghost'}
                    className={cn(
                      'flex items-center gap-2 rounded-md shadow-sm h-10 px-3 justify-start',
                      isSelected && 'border border-primary'
                    )}
                    onClick={() => {
                      onChange(getOptionValue(item));
                      setOpen(false);
                    }}
                  >
                    {getOptionIcon && (
                      <UIIcon
                        name={getOptionIcon(item) as IconName}
                        className='w-5 h-5'
                        style={{ color: `var(${color})` }}
                      />
                    )}
                    <div className='text-sm truncate'>
                      {getOptionLabel(item)}
                    </div>
                  </Button>
                );
              })}
            </div>
          </DrawerContent>
        )}
      </Drawer>
    </div>
  );
}
