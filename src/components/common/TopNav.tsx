'use client';

import { useUIStore } from '@/stores/useUIStore';
import UIIcon from '@/components/ui/UIIcon';
import { Button } from '@/components/ui/button';

export default function TopNav() {
  const {
    title,
    center,
    // leftSlot,
    // rightSlot,
    onBack,
    onSearchClick,
    onFilterClick,
    showSearchButton,
    showFilterButton,
    onEdit,
    onAdd,
  } = useUIStore((s) => s.topNav);

  const prevPath = useUIStore((s) => s.previousPath);
  const pathName = prevPath?.split('/')[1];

  return (
    <div className='relative flex items-center justify-between px-compact py-compact bg-background backdrop-blur-sm m-tight'>
      {/* 왼쪽 */}
      <div className='flex items-center gap-element min-w-[80px] justify-start'>
        {showSearchButton && (
          <Button
            variant='ghost'
            size='icon'
            onClick={onSearchClick}
            className='text-foreground'
          >
            <UIIcon name='search' />
          </Button>
        )}
        {onBack && (
          <Button
            onClick={onBack}
            variant='ghost'
            className='flex items-center gap-tight px-compact py-compact text-foreground text-label'
          >
            <UIIcon name='chevronLeft' className='w-4 h-4' />
            <span className='whitespace-nowrap'>{pathName}</span>
          </Button>
        )}
        {/* {leftSlot} */}
      </div>

      {/* 중앙 타이틀 */}
      {center ? (
        <div className='flex justify-center items-center pointer-events-none'>
          <h1 className='text-heading font-semibold text-foreground'>
            {title}
          </h1>
        </div>
      ) : (
        <h1 className='text-heading font-semibold text-foreground'>{title}</h1>
      )}

      {/* 오른쪽 */}
      <div className='flex items-center gap-element min-w-[80px] justify-end'>
        {showFilterButton && (
          <Button
            variant='ghost'
            size='icon'
            onClick={onFilterClick}
            className='text-foreground'
          >
            <UIIcon name='filter' />
          </Button>
        )}
        {onEdit && (
          <Button
            variant='ghost'
            size='icon'
            onClick={onEdit}
            className='text-foreground'
          >
            <UIIcon name='pencil' />
          </Button>
        )}
        {onAdd && (
          <Button
            variant='ghost'
            size='icon'
            onClick={onAdd}
            className='text-foreground'
          >
            <UIIcon name='plus' />
          </Button>
        )}
        {/* {rightSlot} */}
      </div>
    </div>
  );
}
