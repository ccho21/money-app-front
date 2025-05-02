'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { usePanelStore } from '@/stores/usePanelStore';

// 패널 컴포넌트 import
import ThemeSettingPanel from './panels/ThemeSettingPanel';
import MonthlyStartDatePanel from './panels/MonthlyStartDatePanel';
import MainCurrencyPanel from './panels/MainCurrencyPanel';
import SubCurrencyPanel from './panels/SubCurrencyPanel';
import BackupResetPanel from './panels/BackupResetPanel';
import AccountGroupPanel from './panels/AccountGroupPanel';
import SlideInPanel from '../../../components/ui/panel/SlideInPanel';

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
          <div className='p-component text-sm text-muted-foreground text-center'>
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
          'w-full max-w-md rounded-t-2xl bg-surface text-foreground transition-all duration-300 p-component shadow-xl'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-md font-semibold'>설정</h2>
          <button onClick={closePanel} aria-label='Close Panel'>
            <X className='w-5 h-5 text-muted-foreground' />
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
