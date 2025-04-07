'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SlideUpPanelProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  backdropClassName?: string;
}

export default function SlideUpPanel({
  open,
  onClose,
  children,
  className,
  backdropClassName,
}: SlideUpPanelProps) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement).id === 'sheet-backdrop') onClose();
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id='sheet-backdrop'
          className={cn(
            'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm',
            backdropClassName
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={cn(
              'absolute bottom-[10vh] left-0 right-0 bg-white dark:bg-zinc-900 rounded-t-2xl z-50 max-h-[85%] flex flex-col shadow-xl',
              className
            )}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
