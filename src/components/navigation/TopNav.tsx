'use client';

import { ChevronLeft, Filter, Pencil, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/modules/shared/stores/useUIStore';

export default function TopNav() {
  const { title, onSearch, onFilter, onEdit, onBack, onAdd } = useUIStore(
    (s) => s.topNav
  );

  return (
    <div className='flex items-center justify-between px-component py-element text-foreground'>
      {/* 왼쪽: 타이틀 + 뒤로가기 */}
      <div className='flex items-center'>
        {onBack && (
          <Button
            onClick={onBack}
            variant='ghost'
            size='icon'
            aria-label='Back'
            className='mr-element'
          >
            <ChevronLeft className='w-icon h-icon text-primary' />
          </Button>
        )}
        <h2 className='text-title font-bold' role='heading' aria-level={2}>
          {title}
        </h2>
      </div>

      {/* 오른쪽: 아이콘 버튼들 */}
      <div className='flex items-center gap-tight'>
        {onSearch && (
          <Button
            onClick={onSearch}
            variant='ghost'
            size='icon'
            aria-label='Search'
          >
            <Search className='text-primary w-icon h-icon' />
          </Button>
        )}
        {onFilter && (
          <Button
            onClick={onFilter}
            variant='ghost'
            size='icon'
            aria-label='Filter'
          >
            <Filter className='text-primary w-icon h-icon' />
          </Button>
        )}
        {onEdit && (
          <Button
            onClick={onEdit}
            variant='ghost'
            size='icon'
            aria-label='Edit'
          >
            <Pencil className='text-primary w-icon h-icon' />
          </Button>
        )}
        {onAdd && (
          <Button onClick={onAdd} variant='ghost' size='icon' aria-label='Add'>
            <Plus className='text-primary w-icon h-icon' />
          </Button>
        )}
      </div>
    </div>
  );
}
