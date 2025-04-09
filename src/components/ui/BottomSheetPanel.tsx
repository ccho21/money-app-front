'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface SlideInPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function BottomSheetPanel({
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

          {/* Bottom sheet panel */}
          <motion.div
            className='fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 rounded-t-2xl shadow-lg'
            initial={{ y: '100%' }} // 아래에서 시작
            animate={{ y: 0 }} // 위로 슬라이드 인
            exit={{ y: '100%' }} // 다시 아래로 나감
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-800'>
              <h2 className='text-base font-semibold text-gray-900 dark:text-white'>
                {title ?? '설정'}
              </h2>
              <button
                onClick={onClose}
                className='p-1 text-gray-500 hover:text-gray-800 dark:hover:text-white'
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className='max-h-[70vh] overflow-y-auto p-4'>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
