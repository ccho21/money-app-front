'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { usePanelStore } from '@/stores/usePanelStore';

// 패널 컴포넌트들 import
import ThemeSettingPanel from './panels/ThemeSettingPanel';
import MonthlyStartDatePanel from './panels/MonthlyStartDatePanel';
import MainCurrencyPanel from './panels/MainCurrencyPanel';
import SubCurrencyPanel from './panels/SubCurrencyPanel';
import BackupResetPanel from './panels/BackupResetPanel';
import AccountGroupPanel from './panels/AccountGroupPanel';
import SlideInPanel from '../ui/SlideInPanel';

export default function SlideInPanelRenderer() {
  const { currentPanel, closePanel } = usePanelStore();

  useEffect(() => {
    if (currentPanel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentPanel]);

  if (!currentPanel) return null;

  const renderPanelContent = () => {
    switch (currentPanel) {
      case 'themeSetting':
        return <ThemeSettingPanel />;
      case 'monthlyStartDate':
        return <MonthlyStartDatePanel />;
      case 'mainCurrency':
        return <MainCurrencyPanel />;
      case 'subCurrency':
        return <SubCurrencyPanel />;
      case 'backupReset':
        return <BackupResetPanel />;
      case 'accountGroup':
        return <AccountGroupPanel />;
      default:
        return (
          <div className='p-4 text-sm text-gray-400 dark:text-gray-500 text-center'>
            준비 중인 패널입니다.
          </div>
        );
    }
  };

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-end justify-center bg-black/50'
      onClick={closePanel}
    >
      <div
        className={clsx(
          'w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-2xl',
          'transition-all duration-300 p-4'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-md font-semibold text-gray-900 dark:text-white'>
            설정
          </h2>
          <button onClick={closePanel} aria-label='Close Panel'>
            <X className='w-5 h-5 text-gray-500 dark:text-gray-300' />
          </button>
        </div>
        <SlideInPanel isOpen={true} onClose={closePanel} title='설정'>
          {renderPanelContent()}
        </SlideInPanel>
      </div>
    </div>,
    document.body
  );
}
