import { ReactNode } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';

interface TopNavProps {
  title: string;
  center?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onBack?: () => void;
}

export default function TopNav({ title, center = true, leftSlot, rightSlot, onBack }: TopNavProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-black">
      <div className="flex items-center gap-2">
        {onBack && (
          <button onClick={onBack}>
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        )}
        {leftSlot}
      </div>

      <h1 className={`text-lg font-semibold ${center ? 'text-center flex-1' : ''}`}>{title}</h1>

      <div className="flex items-center gap-3">
        {rightSlot}
      </div>
    </div>
  );
}