'use client';

import { Pencil, X } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

interface SelectorProps<T> {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: T[] | readonly T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  getOptionIcon?: (option: T) => React.ReactNode;
  onEdit?: () => void;
  className?: string;
  style?: React.CSSProperties;
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
  className,
  ...props
}: SelectorProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (!ref.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-12 items-center gap-2 ${className ?? ''}`}
      {...props}
    >
      <label className='col-span-2 text-xs font-medium text-muted'>
        {label}
      </label>

      <div className='col-span-10'>
        <input
          readOnly
          value={value}
          onClick={() => setOpen(true)}
          className='w-full py-1 border-b border-border text-foreground bg-transparent focus:outline-none focus:border-primary cursor-pointer'
        />
      </div>

      {open && (
        <div
          className='fixed left-0 right-0 bottom-0 z-40 min-h-[40vh] border-t shadow-md'
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            paddingBottom: '10vh',
          }}
        >
          {/* Header */}
          <div
            className='flex justify-between items-center px-4 py-3 text-sm font-medium border-b'
            style={{
              backgroundColor: 'var(--color-border)',
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
              const selected = getOptionValue(item) === value;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onChange(getOptionValue(item));
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm border transition-colors ${
                    selected
                      ? 'border-primary font-semibold text-foreground bg-surface'
                      : 'border-border text-muted'
                  } rounded-sm`}
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
