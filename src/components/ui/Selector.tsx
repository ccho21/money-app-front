'use client';

import { useRef, useEffect, useState } from 'react';

interface SelectorProps<T> {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: T[];
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
    <div className='relative' ref={ref}>
      <input
        readOnly
        value={value}
        onClick={() => setOpen(true)}
        placeholder={`Select ${label}`}
        className='border-b w-full py-1 focus:outline-none'
      />

      {open && (
        <div className='fixed left-0 right-0 bottom-0 z-30 bg-gray-300 border-t shadow-md min-h-[35vh]'>
          <div className='flex justify-between items-center px-4 py-2 bg-black text-white text-sm'>
            <span>{label}</span>
            <div className='flex gap-3'>
              {onEdit && (
                <button onClick={onEdit} title='Edit'>
                  ✏
                </button>
              )}
              <button onClick={() => setOpen(false)} title='Cancel'>
                ✕
              </button>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-px bg-gray-300 text-sm'>
            {options.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onChange(getOptionValue(item));
                  setOpen(false);
                }}
                className='bg-white p-3 text-center'
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
