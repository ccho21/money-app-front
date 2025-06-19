'use client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { cn } from '@/modules/shared/util/style.utils';
import { useConditionalRender } from '@/modules/shared/hooks/conditionalRender';
import { IconName } from '@/modules/shared/util/icon.utils';
import UIIcon from '@/components/common/UIIcon';
import { Button } from '../button';

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
  children: React.ReactNode;
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
  children,
}: SelectorProps<T>) {
  const [open, setOpen] = useState(false);
  const shouldRender = useConditionalRender(open);

  return (
    <div className={cn('', className)}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        {shouldRender && (
          <DrawerContent className='pb-component' aria-describedby={undefined}>
            <DrawerHeader className='py-compact'>
              <div className='flex items-center justify-between'>
                <DrawerTitle className='text-heading'>{label}</DrawerTitle>
                {onEdit && (
                  <button
                    type='button'
                    onClick={onEdit}
                    title='Add'
                    className='text-muted-foreground'
                  >
                    <Pencil className='icon-sm' />
                  </button>
                )}
              </div>
            </DrawerHeader>

            <div className='grid gap-element px-component py-component'>
              {options.map((item, idx) => {
                const isSelected = getOptionValue(item) === value;

                return (
                  <Button
                    key={idx}
                    type='button'
                    className={cn(
                      'flex items-center justify-start gap-element shadow-sm text-label truncate bg-background',
                      isSelected
                        ? 'border border-primary bg-primary text-white'
                        : 'hover:bg-muted'
                    )}
                    onClick={() => {
                      onChange(getOptionValue(item));
                      setOpen(false);
                    }}
                  >
                    {getOptionIcon && (
                      <UIIcon name={getOptionIcon(item)} className='icon-md' />
                    )}
                    {getOptionColor && (
                      <div
                        className='w-2 h-2 rounded-full'
                        style={{
                          backgroundColor: `var(${getOptionColor(item)})`,
                        }}
                      ></div>
                    )}
                    {getOptionLabel(item)}
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
