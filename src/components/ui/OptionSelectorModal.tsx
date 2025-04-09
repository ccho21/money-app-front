'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, X } from 'lucide-react';
import clsx from 'clsx';

export interface Option<T = string> {
  label: string;
  value: T;
}
export interface OptionSelectorModalProps<T = string> {
  isOpen: boolean;
  title: string;
  options: Option<T>[];
  selected?: T;
  onSelect: (value: T) => void;
  onClose: () => void;
}

export default function OptionSelectorModal<T extends string | number>({
  isOpen,
  title,
  options,
  selected,
  onSelect,
  onClose,
}: OptionSelectorModalProps<T>) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-end justify-center bg-black/40'
      onClick={onClose}
    >
      <div
        className='w-full max-w-md px-4 pb-6'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 옵션 박스 */}
        <div className='bg-white dark:bg-zinc-900 rounded-xl overflow-hidden'>
          <div className='text-center py-4 border-b border-gray-200 dark:border-zinc-700'>
            <h2 className='text-md font-semibold text-gray-800 dark:text-white'>
              {title}
            </h2>
          </div>
          <div className='max-h-[50vh] overflow-y-auto divide-y divide-gray-100 dark:divide-zinc-700'>
            {options.map((option) => (
              <button
                key={String(option.value)}
                className={clsx(
                  'w-full flex items-center justify-between px-6 py-4 text-lg',
                  selected === option.value
                    ? 'text-red-500 font-semibold'
                    : 'text-gray-800 dark:text-gray-200'
                )}
                onClick={() => {
                  onSelect(option.value);
                  onClose();
                }}
              >
                <span>{option.label}</span>
                {selected === option.value && (
                  <Check className='w-5 h-5 text-red-500' />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 취소 버튼 */}
        <div className='mt-3 bg-white dark:bg-zinc-900 rounded-xl overflow-hidden'>
          <button
            className='w-full text-center py-4 text-base text-gray-600 dark:text-gray-300 font-medium'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
