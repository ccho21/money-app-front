'use client';

import { useUIStore } from '@/stores/useUIStore';
import { ChevronLeft, Filter, Pencil, Plus, Search } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { CustomTrigger } from '../custom-trigger';
import { Button } from '../ui/button';
import FilterSheet from '@/components/common/FilterSheet';
import { useState } from 'react';

export default function TopNav() {
  const {
    title,
    center,
    // onBack,
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
    <div className='relative flex items-center justify-between px-component py-element bg-card border-b border-border'>
      {/* 왼쪽 */}
      <div className='flex items-center gap-element min-w-[80px] justify-start'>
        {showSearchButton && (
          <Button onClick={onSearchClick} variant='ghost'>
            <Search className='w-5 h-5' />
          </Button>
        )}
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
          <Button onClick={onFilterClick} variant='ghost'>
            <Filter className='w-5 h-5' />
          </Button>
        )}
        {onEdit && (
          <Button onClick={onEdit} variant='ghost'>
            <Pencil className='w-5 h-5' />
          </Button>
        )}
        {onAdd && (
          <Button onClick={onAdd} variant='ghost'>
            <Plus className='w-5 h-5' />
          </Button>
        )}
      </div>
    </div>
  );
}
