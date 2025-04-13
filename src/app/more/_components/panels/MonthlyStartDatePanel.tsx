'use client';

import { useState } from 'react';
import { useUserSettingStore } from '@/stores/useUserSettingStore';
import { usePanelStore } from '@/stores/usePanelStore';

export default function MonthlyStartDatePanel() {
  const { closePanel } = usePanelStore();
  const { monthlyStartDate, setMonthlyStartDate } = useUserSettingStore();
  const [selected, setSelected] = useState<number>(monthlyStartDate);

  const handleSave = () => {
    setMonthlyStartDate(selected);
    closePanel();
  };

  return (
    <div className='p-4 bg-surface text-foreground'>
      <h2 className='text-md font-semibold text-center mb-6'>
        Monthly Start Date
      </h2>

      <div className='text-center text-sm mb-4 text-muted'>
        Start Date:{' '}
        <span className='font-semibold text-foreground'>{selected}</span>
      </div>

      <div className='grid grid-cols-7 gap-2 text-sm mb-6'>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            onClick={() => setSelected(day)}
            className={`w-full aspect-square rounded-sm border text-center ${
              selected === day
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface text-foreground border-border hover:bg-muted/10'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        className='w-full py-3 rounded-md bg-primary text-on-primary text-sm font-semibold hover:opacity-90 transition'
      >
        Save
      </button>
    </div>
  );
}
