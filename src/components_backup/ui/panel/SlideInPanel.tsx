'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

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
          {/* Dimmed Background */}
          <motion.div
            className='fixed inset-0 z-40 bg-black/40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-in Panel */}
          <motion.div
            className='fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-surface flex flex-col shadow-lg'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className='flex items-center justify-between p-component border-b border-border'>
              <h2 className='text-md font-semibold text-foreground'>
                {title ?? 'Settings'}
              </h2>
              <button
                onClick={onClose}
                className='p-tight text-muted hover:text-foreground'
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className='flex-1 overflow-y-auto p-component'>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
