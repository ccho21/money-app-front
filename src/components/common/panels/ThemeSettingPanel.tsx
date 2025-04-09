'use client';

import { useState } from 'react';
import { CheckCircle, Circle, Moon, Sun, Settings2 } from 'lucide-react';
import clsx from 'clsx';
import { useUserSettingStore } from '@/stores/useUserSettingStore';

type ThemeColor = 'white' | 'red' | 'pink' | 'green' | 'blue' | 'black';

const colorOptions: { color: ThemeColor; hex: string }[] = [
  { color: 'white', hex: '#f1f1f1' },
  { color: 'red', hex: '#f97316' },
  { color: 'pink', hex: '#fb7185' },
  { color: 'green', hex: '#22c55e' },
  { color: 'blue', hex: '#3b82f6' },
  { color: 'black', hex: '#1f2937' },
];

export default function ThemeSettingPanel() {
  const theme = useUserSettingStore((s) => s.theme);
  const setTheme = useUserSettingStore((s) => s.setTheme);

  // ⚠️ 아직 color는 zustand에 없음 (추가 필요)
  const [selectedColor, setSelectedColor] = useState<ThemeColor>('green');

  const ModeRow = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: 'light' | 'dark' | 'system';
    icon: React.ReactNode;
  }) => (
    <button
      onClick={() => setTheme(value)}
      className='flex items-center justify-between py-4 px-4 w-full'
    >
      <div className='flex items-center gap-3 text-gray-800 dark:text-white'>
        {icon}
        <span className='text-sm'>{label}</span>
      </div>
      {theme === value ? (
        <CheckCircle className='text-green-500 w-5 h-5' />
      ) : (
        <Circle className='text-gray-300 w-5 h-5' />
      )}
    </button>
  );

  return (
    <div className='pb-6'>
      <div className='border-t border-b border-gray-200 dark:border-zinc-700'>
        <ModeRow
          label='System Mode'
          value='system'
          icon={<Settings2 size={16} />}
        />
        <ModeRow label='Dark Mode' value='dark' icon={<Moon size={16} />} />
        <ModeRow label='Light Mode' value='light' icon={<Sun size={16} />} />
      </div>

      <div className='flex flex-wrap gap-4 px-4 pt-6'>
        {colorOptions.map(({ color, hex }) => {
          const isActive = selectedColor === color;
          return (
            <button
              key={color}
              className={clsx(
                'w-8 h-8 rounded-full border-2',
                isActive ? 'border-green-500' : 'border-transparent'
              )}
              style={{ backgroundColor: hex }}
              onClick={() => setSelectedColor(color)}
            />
          );
        })}
      </div>
    </div>
  );
}
