'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import * as React from 'react';

interface BottomSheetPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  rightActions?: React.ReactNode; // ← 추가된 상단 우측 버튼 영역
}

export default function BottomSheetPanel({
  isOpen,
  onClose,
  children,
  title,
  rightActions,
}: BottomSheetPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed inset-0 z-50'
        >
          {/* 🖤 Dimmed Background */}
          <div className='absolute inset-0 bg-black/40' onClick={onClose} />

          {/* 📦 Slide-Up Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='absolute bottom-0 left-0 right-0 bg-surface dark:bg-surface rounded-t-xl shadow-md flex flex-col max-h-[70vh] will-change-transform'
            onClick={(e) => e.stopPropagation()}
          >
            {/* 🔲 Header */}
            <div className='bg-white flex items-center justify-between px-4 py-3 border-b border-border shrink-0'>
              <h2 className='text-base font-semibold text-foreground'>
                {title ?? 'Detail'}
              </h2>

              <div className='flex items-center gap-2'>
                {rightActions}
                <button
                  onClick={onClose}
                  className='text-muted-foreground hover:text-foreground transition-colors'
                  aria-label='Close'
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* 📄 Scrollable Content */}
            <div className='overflow-auto min-h-0 grow px-4 py-2'>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
