'use client';

import { CheckCircle, Circle, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';
import { AppThemeColor } from '../../types/types';

const colorOptions: { color: AppThemeColor; oklch: string }[] = [
  {
    color: 'red',
    oklch: 'oklch(0.637 0.237 25.331)',
  },
  {
    color: 'rose',
    oklch: 'oklch(0.645 0.246 16.439)',
  },
  {
    color: 'orange',
    oklch: 'oklch(0.705 0.213 47.604)',
  },
  {
    color: 'green',
    oklch: 'oklch(0.723 0.219 149.579)',
  },
  {
    color: 'blue',
    oklch: 'oklch(0.623 0.214 259.815)',
  },
  {
    color: 'yellow',
    oklch: 'oklch(0.795 0.184 86.047)',
  },
  {
    color: 'violet',
    oklch: 'oklch(0.606 0.25 292.717)',
  },
];

interface ThemeSettingPanelProps {
  onClose: () => void;
}

export default function ThemeSettingPanel({ onClose }: ThemeSettingPanelProps) {
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
    value: 'light' | 'dark';
    icon: React.ReactNode;
  }) => (
    <button
      onClick={() => setTheme(value)}
      className='flex items-center justify-between w-full py-component px-component border-b border-border last:border-0'
    >
      <div className='flex items-center gap-element text-foreground'>
        {icon}
        <span className='text-label'>{label}</span>
      </div>
      {theme === value ? (
        <CheckCircle className='icon-md text-success' />
      ) : (
        <Circle className='icon-md text-muted' />
      )}
    </button>
  );

  const handleSave = () => {
    onClose(); // 설정은 즉시 저장되므로 닫기만 하면 됨
  };

  return (
    <div className='bg-surface text-foreground'>
      {/* 테마 모드 선택 */}
      <div className='border-t border-border'>
        <ModeRow
          label='Dark Mode'
          value='dark'
          icon={<Moon className='icon-sm' />}
        />
        <ModeRow
          label='Light Mode'
          value='light'
          icon={<Sun className='icon-sm' />}
        />
      </div>

      {/* 테마 컬러 선택 */}
      <div className='flex flex-wrap gap-element px-component pt-spacious pb-component'>
        {colorOptions.map(({ color, oklch }) => {
          const isActive = themeColor === color;
          return (
            <button
              key={color}
              className={clsx(
                'w-8 h-8 rounded-full border-2 transition-all',
                isActive ? 'border-success' : 'border-border'
              )}
              style={{ backgroundColor: oklch }}
              onClick={() => setThemeColor(color)}
              aria-label={`Change theme color to ${color}`}
            />
          );
        })}
      </div>

      {/* Save 버튼 */}
      <div className='px-component pb-component'>
        <button
          onClick={handleSave}
          className='w-full py-component rounded-md bg-primary text-primary-foreground text-label font-semibold hover:opacity-90 transition'
        >
          Save
        </button>
      </div>
    </div>
  );
}
