'use client';

import { cn } from '@features/shared/utils';
import { Plus } from 'lucide-react';

interface Props {
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export default function FloatingActionButton({
  onClick,
  icon = <Plus className="w-5 h-5 text-white" />,
  className = '',
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-6 right-6 z-50 bg-red-500 hover:bg-red-600 rounded-full p-4 shadow-lg',
        className
      )}
    >
      {icon}
    </button>
  );
}
