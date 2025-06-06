'use client';

import { useState } from 'react';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';

interface StartPagePanelProps {
  onClose: () => void;
}

export default function StartPagePanel({ onClose }: StartPagePanelProps) {
  const { startPage, setStartPage } = useUserSettingStore();
  const [selected, setSelected] = useState<'list' | 'calendar'>(startPage);

  const handleSave = () => {
    setStartPage(selected);
    onClose(); // 저장 후 패널 닫기
  };

  return (
    <div className='p-component bg-surface text-foreground rounded-md'>
      <h2 className='text-title font-semibold text-center mb-spacious'>
        Start Page
      </h2>

      <div className='grid grid-cols-2 gap-tight mb-spacious'>
        {['list', 'calendar'].map((page) => (
          <button
            key={page}
            onClick={() => setSelected(page as 'list' | 'calendar')}
            className={`py-component rounded-md border text-label transition ${
              selected === page
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-surface text-foreground border-border hover:bg-muted/10'
            }`}
          >
            {page === 'list' ? 'List View' : 'Calendar View'}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        className='w-full py-component rounded-md bg-primary text-primary-foreground text-label font-semibold hover:opacity-90 transition'
      >
        Save
      </button>
    </div>
  );
}
