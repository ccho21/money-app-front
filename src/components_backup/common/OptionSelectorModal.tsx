// src/components/common/OptionSelectorModal.tsx
'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';
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
        className='w-full max-w-md px-component pb-element'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 옵션 리스트 박스 */}
        <div className='bg-surface rounded-card overflow-hidden'>
          <div className='text-center py-element border-b border-border'>
            <h2 className='text-body font-semibold text-foreground'>{title}</h2>
          </div>

          <div className='max-h-[50vh] overflow-y-auto divide-y divide-border'>
            {options.map((option) => {
              const isSelected = selected === option.value;
              return (
                <button
                  key={String(option.value)}
                  className={clsx(
                    'w-full flex items-center justify-between px-section py-element text-body transition',
                    isSelected
                      ? 'text-primary font-semibold'
                      : 'text-foreground hover:bg-muted/10'
                  )}
                  onClick={() => {
                    onSelect(option.value);
                    onClose();
                  }}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className='w-5 h-5 text-primary' />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 취소 버튼 */}
        <div className='mt-element bg-surface rounded-card overflow-hidden'>
          <button
            className='w-full text-center py-element text-body text-muted font-medium hover:bg-muted/10'
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
