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
  onEdit?: () => void;
}

export default function Selector<T>({
  label,
  value,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
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
      <label className='col-span-2 text-xs font-medium text-muted-foreground'>
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

      {open && (
        <div className='fixed left-0 right-0 bottom-0 z-30 bg-surface border-t border-border shadow-md min-h-[35vh]'>
          {/* Header */}
          <div className='flex justify-between items-center px-4 py-2 bg-surface border-b border-border text-sm text-foreground'>
            <span>{label}</span>
            <div className='flex gap-3'>
              {onEdit && (
                <button onClick={onEdit} title='Edit'>
                  <Pencil className='w-5 h-5 text-muted-foreground' />
                </button>
              )}
              <button onClick={() => setOpen(false)} title='Cancel'>
                <X className='w-5 h-5 text-muted-foreground' />
              </button>
            </div>
          </div>

          {/* Options */}
          <div className='grid grid-cols-3 gap-px bg-border text-sm'>
            {options.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onChange(getOptionValue(item));
                  setOpen(false);
                }}
                className='p-3 text-center bg-surface hover:bg-accent hover:text-primary transition'
              >
                {getOptionLabel(item)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
