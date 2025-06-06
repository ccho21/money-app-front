'use client';

import { useState } from 'react';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';

interface MonthlyStartDatePanelProps {
  onClose: () => void;
}

export default function MonthlyStartDatePanel({
  onClose,
}: MonthlyStartDatePanelProps) {
  const { monthlyStartDate, setMonthlyStartDate } = useUserSettingStore();
  const [selected, setSelected] = useState<number>(monthlyStartDate);

  const handleSave = () => {
    setMonthlyStartDate(selected);
    onClose(); // 패널 닫기
  };

  return (
    <div className='text-foreground rounded-md'>
      <h2
        className='text-title font-semibold text-center mb-spacious'
        role='heading'
        aria-level={2}
      >
        Monthly Start Date
      </h2>

      <div className='text-center text-label mb-element text-muted-foreground'>
        Start Date:{' '}
        <span className='font-semibold text-foreground'>{selected}</span>
      </div>

      <div className='grid grid-cols-7 gap-tight text-label mb-spacious'>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
          const isSelected = selected === day;
          return (
            <button
              key={day}
              onClick={() => setSelected(day)}
              className={`w-full aspect-square rounded-sm border text-center transition ${
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-surface text-foreground border-border hover:bg-muted/10'
              }`}
            >
              {day}
            </button>
          );
        })}
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
