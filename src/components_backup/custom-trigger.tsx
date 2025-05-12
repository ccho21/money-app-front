import { PanelLeft } from 'lucide-react';
import { useSidebar } from '@/components_backup/ui/sidebar';

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className='flex items-center gap-tight p-compact rounded-input text-foreground hover:bg-muted transition-colors text-label'
    >
      <PanelLeft className='w-5 h-5' />
    </button>
  );
}
