'use client';

import { Card, CardContent } from '@/components/ui/card';
import UIIcon from '@/components/common/UIIcon';
import { IconName } from '@/modules/shared/util/icon.utils';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/modules/shared/util/style.utils';
import { ReactNode } from 'react';

interface SettingItemProps {
  icon: IconName;
  title: ReactNode;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

export default function SettingItem({
  icon,
  title,
  subtitle,
  onClick,
  className,
}: SettingItemProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'px-component py-component shadow-2xs border-none rounded-none',
        className
      )}
    >
      <CardContent className='flat-card-content py-component px-component'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-component'>
            <UIIcon name={icon} className='w-6 h-6' />
            <div className='text-left'>
              <p className='text-body font-normal leading-none text-foreground'>
                {title}
              </p>
              {subtitle && (
                <p className='text-subheading text-muted-foreground truncate w-[220px]'>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <ChevronRight size={16} className='text-muted-foreground' />
        </div>
      </CardContent>
    </Card>
  );
}
