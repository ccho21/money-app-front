'use client';

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
  const themeColor = useUserSettingStore((s) => s.themeColor);
  const setTheme = useUserSettingStore((s) => s.setTheme);
  const setThemeColor = useUserSettingStore((s) => s.setThemeColor);

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
      className='flex items-center justify-between w-full py-4 px-4 border-b border-border last:border-0'
    >
      <div className='flex items-center gap-3 text-foreground'>
        {icon}
        <span className='text-sm'>{label}</span>
      </div>
      {theme === value ? (
        <CheckCircle className='text-success w-5 h-5' />
      ) : (
        <Circle className='text-muted w-5 h-5' />
      )}
    </button>
  );

  return (
    <div className='bg-surface text-foreground'>
      <div className='border-t border-border'>
        <ModeRow
          label='System Mode'
          value='system'
          icon={<Settings2 size={16} />}
        />
        <ModeRow label='Dark Mode' value='dark' icon={<Moon size={16} />} />
        <ModeRow label='Light Mode' value='light' icon={<Sun size={16} />} />
      </div>

      <div className='flex flex-wrap gap-4 px-4 pt-6 pb-4'>
        {colorOptions.map(({ color, hex }) => {
          const isActive = themeColor === color;
          return (
            <button
              key={color}
              className={clsx(
                'w-8 h-8 rounded-full border-2 transition-all',
                isActive ? 'border-success' : 'border-border'
              )}
              style={{ backgroundColor: hex }}
              onClick={() => setThemeColor(color)}
              aria-label={`Change theme color to ${color}`}
            />
          );
        })}
      </div>
    </div>
  );
}
