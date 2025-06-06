'use client';

import { useState } from 'react';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';

interface WeeklyStartDayProps {
  onClose: () => void;
}

export default function WeeklyStartDay({ onClose }: WeeklyStartDayProps) {
  const { weeklyStartDay, setWeeklyStartDay } = useUserSettingStore();
  const [selected, setSelected] = useState<'sunday' | 'monday'>(weeklyStartDay);

  const handleSave = () => {
    setWeeklyStartDay(selected);
    onClose(); // 저장 후 패널 닫기
  };

  return (
    <div className='layout-body bg-surface text-foreground rounded-md'>
      <h2
        className='text-title font-semibold text-center mb-spacious'
        role='heading'
        aria-level={2}
      >
        Weekly Start Day
      </h2>

      <div className='grid grid-cols-2 gap-tight mb-spacious'>
        {(['sunday', 'monday'] as const).map((day) => (
          <button
            key={day}
            onClick={() => setSelected(day)}
            className={`py-component rounded-md border text-label transition ${
              selected === day
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-surface text-foreground border-border hover:bg-muted/10'
            }`}
          >
            {day === 'sunday' ? 'Sunday' : 'Monday'}
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
