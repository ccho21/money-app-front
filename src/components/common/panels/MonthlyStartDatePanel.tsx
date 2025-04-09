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
    <div className='p-4'>
      <h2 className='text-lg font-semibold text-center mb-6'>
        Monthly Start Date
      </h2>

      <div className='text-center text-sm mb-4 text-gray-500'>
        Start Date:{' '}
        <span className='font-semibold text-black dark:text-white'>
          {selected}
        </span>
      </div>

      <div className='grid grid-cols-7 gap-2 text-sm mb-6'>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            onClick={() => setSelected(day)}
            className={`w-full aspect-square rounded-sm border text-center ${
              selected === day
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white dark:bg-zinc-900 text-gray-800 dark:text-white border-gray-200 dark:border-zinc-700'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        className='w-full py-3 rounded-md bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition'
      >
        Save
      </button>
    </div>
  );
}
