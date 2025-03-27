'use client';

import { useRef, useEffect, useState } from 'react';

interface SelectorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  onEdit?: () => void; // ✏ 수정 버튼 누를 때
}

export default function Selector({
  label,
  value,
  onChange,
  options,
  onEdit,
}: SelectorProps) {
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
          {/* Header */}
          <div className='flex justify-between items-center px-4 py-2 bg-black text-white text-sm'>
            <span>{label}</span>
            <div className='flex gap-3'>
              <button onClick={onEdit} title='Edit'>
                ✏
              </button>
              <button onClick={() => setOpen(false)} title='Cancel'>
                ✕
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className='grid grid-cols-3 gap-px bg-gray-300 text-sm'>
            {options.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className='bg-white p-3 text-center'
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
