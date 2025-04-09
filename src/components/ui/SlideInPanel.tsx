'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideInPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function SlideInPanel({
  isOpen,
  onClose,
  children,
  title,
}: SlideInPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dimmed background */}
          <motion.div
            className='fixed inset-0 z-40 bg-black/40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Side Slide-in panel (Right → Left entry) */}
          <motion.div
            className='fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-zinc-900 flex flex-col shadow-lg'
            initial={{ x: '100%' }} // 시작은 오른쪽 바깥
            animate={{ x: 0 }} // 화면 안으로 슬라이드 인
            exit={{ x: '100%' }} // 오른쪽으로 나감
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-800'>
              <h2 className='text-base font-semibold text-gray-900 dark:text-white'>
                {title ?? 'Settings'}
              </h2>
              <button
                onClick={onClose}
                className='p-1 text-gray-500 hover:text-gray-800 dark:hover:text-white'
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className='flex-1 overflow-y-auto p-4'>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
