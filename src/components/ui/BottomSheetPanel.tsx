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
          {/* ✅ Dimmed Background */}
          <motion.div
            className='fixed inset-0 z-40 bg-black/40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ✅ Slide-Up Panel */}
          <motion.div
            className='fixed bottom-0 left-0 right-0 z-50 bg-surface dark:bg-surface rounded-t-xl shadow-xl'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ✅ Header */}
            <div className='flex items-center justify-between px-4 py-3 border-b border-border'>
              <h2 className='text-md font-semibold text-text'>
                {title ?? '설정'}
              </h2>
              <button
                onClick={onClose}
                className='p-1 text-muted-foreground hover:text-text transition-colors'
              >
                <X size={20} />
              </button>
            </div>

            {/* ✅ Content */}
            <div className='max-h-[70vh] overflow-y-auto py-3'>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
