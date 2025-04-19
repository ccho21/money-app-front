'use client';

import { Pencil, X } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface SelectorProps<T> {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: T[] | readonly T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  getOptionIcon?: (option: T) => React.ReactNode;
  onEdit?: () => void;
}

export default function Selector<T>({
  label,
  value,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  getOptionIcon,
  onEdit,
}: SelectorProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  return (
    <div className='grid grid-cols-12 items-center gap-2' ref={ref}>
      {/* Label */}
      <label className='col-span-2 text-xs font-medium text-muted'>
        {label}
      </label>

      {/* Input */}
      <div className='col-span-10'>
        <input
          readOnly
          value={value}
          onClick={() => setOpen(true)}
          className='w-full py-1 border-b border-border text-foreground bg-transparent focus:outline-none focus:border-primary cursor-pointer'
        />
      </div>

      {/* Bottom Sheet */}
      {open && (
        <div
          className='fixed left-0 right-0 bottom-0 z-40 min-h-[40vh] border-t shadow-md'
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            paddingBottom: '10vh', // safe area
          }}
        >
          {/* Header */}
          <div
            className='flex justify-between items-center px-4 py-3 text-sm font-medium border-b'
            style={{
              backgroundColor: 'var(--color-border)', // ✅ 더 뚜렷한 헤더 구분
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            <span>{label}</span>
            <div className='flex gap-3'>
              {onEdit && (
                <button onClick={onEdit} title='Edit'>
                  <Pencil className='w-5 h-5 text-muted' />
                </button>
              )}
              <button onClick={() => setOpen(false)} title='Close'>
                <X className='w-5 h-5 text-muted' />
              </button>
            </div>
          </div>

          {/* Options */}
          <div className='flex flex-col gap-1 px-4 py-4'>
            {options.map((item, idx) => {
              const isSelected = getOptionValue(item) === value;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    onChange(getOptionValue(item));
                    setOpen(false);
                  }}
                  className='flex items-center justify-start gap-2 px-4 py-2 text-sm border transition-colors'
                  style={{
                    borderColor: isSelected
                      ? 'var(--color-primary)'
                      : 'var(--color-border)',
                    backgroundColor: isSelected
                      ? 'var(--color-surface)'
                      : 'transparent',
                    fontWeight: isSelected ? 600 : 400,
                    borderRadius: '2px', // ✅ 거의 직각
                    color: isSelected
                      ? 'var(--color-text)'
                      : 'var(--color-muted)',
                  }}
                >
                  {getOptionIcon?.(item)}
                  {getOptionLabel(item)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
