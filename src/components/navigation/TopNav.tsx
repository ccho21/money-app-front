'use client';

import { useUIStore } from '@/stores/useUIStore';
import { ChevronLeft, Filter, Pencil, Plus, Search } from 'lucide-react';
import { Button } from '../../components_backup/ui/button';
import { TypographyH2, TypographyH3, TypographyH4 } from '../ui/typography';

export default function TopNav() {
  const {
    title,
    onSearch,
    onFilter,
    onEdit,
    onBack,
    onAdd,
  } = useUIStore((s) => s.topNav);

  return (
    <div className='flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200'>
      {/* 왼쪽: 타이틀 */}
      <div className='flex items-center'>
        {onBack && (
          <Button onClick={onBack} variant='ghost' size='icon' className='mr-element'>
            <ChevronLeft className='w-7 h-7 text-gray-700' />
          </Button>
        )}
        <TypographyH4>{title}</TypographyH4>
      </div>

      {/* 오른쪽: 아이콘 버튼들 */}
      <div className='flex items-center gap-1'>
        {onSearch && (
          <Button onClick={onSearch} variant='ghost' size='icon'>
            <Search className='w-5 h-5 text-gray-700' />
          </Button>
        )}
        {onFilter && (
          <Button onClick={onFilter} variant='ghost' size='icon'>
            <Filter className='w-5 h-5 text-gray-700' />
          </Button>
        )}
        {onEdit && (
          <Button onClick={onEdit} variant='ghost' size='icon'>
            <Pencil className='w-5 h-5 text-gray-700' />
          </Button>
        )}
        {onAdd && (
          <Button onClick={onAdd} variant='ghost' size='icon'>
            <Plus className='w-5 h-5 text-gray-700' />
          </Button>
        )}
      </div>
    </div>
  );
}
