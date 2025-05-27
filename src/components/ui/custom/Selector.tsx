'use client';

import { ChevronDown, Pencil } from 'lucide-react';
import { useState } from 'react';

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { cn } from '@/modules/shared/lib/utils';
import { useConditionalRender } from '@/modules/shared/hooks/useConditionalRender';
import { IconName } from '@/modules/shared/lib/iconMap';
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
  const shouldRender = useConditionalRender(open);

  return (
    <div
      className={cn('', className)}
      {...(open ? { inert: true } : {})}
    >
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            type='button'
            variant='outline'
            className='w-full justify-between text-left text-label'
          >
            <span className='truncate'>{value}</span>
            <ChevronDown className='icon-sm text-muted-foreground' />
          </Button>
        </DrawerTrigger>

        {shouldRender && (
          <DrawerContent className='pb-component' aria-describedby={undefined}>
            <DrawerHeader className='py-compact'>
              <div className='flex items-center justify-between'>
                <DrawerTitle className='text-heading'>{label}</DrawerTitle>
                {onEdit && (
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={onEdit}
                    title='Add'
                    className='text-muted-foreground'
                  >
                    <Pencil className='icon-sm' />
                  </Button>
                )}
              </div>
            </DrawerHeader>

            <div className='grid grid-cols-3 gap-element px-component py-component'>
              {options.map((item, idx) => {
                const isSelected = getOptionValue(item) === value;

                return (
                  <Button
                    key={idx}
                    type='button'
                    variant={isSelected ? 'default' : 'ghost'}
                    className={cn(
                      'flex items-center justify-start gap-element rounded-md shadow-sm h-[2.5rem] px-element',
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
                        className='icon-md'
                        // style={{ color: `var(${getOptionColor?.(item)})` }}
                      />
                    )}
                    <div className='text-label truncate'>
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
