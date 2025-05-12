import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

interface SettingItemProps {
  icon: ReactNode;
  title: ReactNode;
  subtitle?: string;
  onClick?: () => void;
}

export default function SettingItem({
  icon,
  title,
  subtitle,
  onClick,
}: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className='flex items-center justify-between w-full px-4 py-3 bg-surface border-b border-border transition hover:bg-muted/10'
    >
      <div className='flex items-center gap-3'>
        {icon}
        <div className='text-left'>
          <p className='text-sm font-medium text-foreground'>{title}</p>
          {subtitle && (
            <p className='text-xs text-foreground truncate w-[220px]'>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <ChevronRight size={16} className='text-foreground' />
    </button>
  );
}