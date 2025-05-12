'use client';

import { ChevronDown, Pencil, X } from 'lucide-react';
import { useState } from 'react';

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components_backup/ui/drawer';
import { Button } from '@/components_backup/ui/button';
import { cn } from '@/lib/utils';
import { useConditionalRender } from '@/hooks/useConditionalRender';

interface SelectorProps<T> {
  value: string;
  label: string;
  onChange: (val: string) => void;
  options: T[];
  getOptionLabel: (item: T) => string;
  getOptionValue: (item: T) => string;
  getOptionIcon?: (item: T) => React.ReactNode;
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
          <DrawerContent className='pb-[10vh]' aria-describedby={undefined}>
            <DrawerHeader className='border-b border-border p-element'>
              <div className='flex items-center justify-between'>
                <DrawerTitle className='text-md'>{label}</DrawerTitle>
                <div className='flex items-center gap-2'>
                  {onEdit && (
                    <Button
                      type='button'
                      variant='ghost'
                      onClick={onEdit}
                      title='Edit'
                    >
                      <Pencil className='w-4 h-4 text-muted-foreground' />
                    </Button>
                  )}
                  <DrawerClose asChild>
                    <Button type='button' variant='ghost' title='Close'>
                      <X className='w-4 h-4 text-muted-foreground' />
                    </Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerHeader>

            <div className='flex flex-col gap-1 px-4 py-4'>
              {options.map((item, idx) => {
                const isSelected = getOptionValue(item) === value;
                return (
                  <Button
                    key={idx}
                    type='button'
                    variant={isSelected ? 'default' : 'ghost'}
                    className='justify-start text-left'
                    onClick={() => {
                      onChange(getOptionValue(item));
                      setOpen(false);
                    }}
                  >
                    <div className='flex items-center gap-2'>
                      {getOptionIcon?.(item)}
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
