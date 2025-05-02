// src/components/common/BottomSheetPanel.tsx
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
            className='fixed bottom-[10vh] left-0 right-0 z-50 bg-surface dark:bg-surface rounded-input shadow-md flex flex-col max-h-[70vh]'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ✅ Header */}
            <div className='flex items-center justify-between px-component py-element border-b border-border shrink-0'>
              <h2 className='text-body font-semibold text-foreground'>
                {title ?? 'Detail'}
              </h2>
              <button
                onClick={onClose}
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <X size={20} />
              </button>
            </div>

            {/* ✅ Scrollable Content */}
            <div className='overflow-y-auto grow'>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
