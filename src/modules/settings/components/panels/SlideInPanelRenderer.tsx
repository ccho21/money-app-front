'use client';

import dynamic from 'next/dynamic';
import { PanelType } from '@/modules/settings/types/types';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { JSX, useEffect, useState } from 'react';

const ThemeSettingPanel = dynamic(() => import('./ThemeSettingPanel'), {
  ssr: false,
});
const MonthlyStartDatePanel = dynamic(() => import('./MonthlyStartDatePanel'), {
  ssr: false,
});
const MainCurrencyPanel = dynamic(() => import('./MainCurrencyPanel'), {
  ssr: false,
});
const SubCurrencyPanel = dynamic(() => import('./SubCurrencyPanel'), {
  ssr: false,
});
const BackupResetPanel = dynamic(() => import('./BackupResetPanel'), {
  ssr: false,
});
const AccountGroupPanel = dynamic(() => import('./AccountGroupPanel'), {
  ssr: false,
});
const WeeklyStartDay = dynamic(() => import('./WeeklyStartDay'), {
  ssr: false,
});
const StartPagePanel = dynamic(() => import('./StartPagePanel'), {
  ssr: false,
});

const panelMap: Record<Exclude<PanelType, null>, () => JSX.Element> = {
  themeSetting: () => <ThemeSettingPanel />,
  monthlyStartDate: () => <MonthlyStartDatePanel />,
  weeklyStartDay: () => <WeeklyStartDay />,
  startPage: () => <StartPagePanel />,
  mainCurrency: () => <MainCurrencyPanel />,
  subCurrency: () => <SubCurrencyPanel />,
  backupReset: () => <BackupResetPanel />,
  accountGroup: () => <AccountGroupPanel />,
};

const panelTitleMap: Record<Exclude<PanelType, null>, string> = {
  themeSetting: 'Style / Theme',
  monthlyStartDate: 'Monthly Start Date',
  weeklyStartDay: 'Weekly Start Day',
  startPage: 'Start Page',
  mainCurrency: 'Main Currency',
  subCurrency: 'Sub Currency',
  backupReset: 'Backup & Reset',
  accountGroup: 'Account Group',
};

interface SlideInPanelRendererProps {
  currentPanel: PanelType;
  onClose: () => void;
}

export function SlideInPanelRenderer({
  currentPanel,
  onClose,
}: SlideInPanelRendererProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (currentPanel) {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [currentPanel]);

  if (!currentPanel) return null;
  const renderPanelContent = panelMap[currentPanel];
  const title = panelTitleMap[currentPanel];

  return (
    <Drawer open={!!currentPanel} onOpenChange={onClose}>
      <DrawerContent className=''>
        {isMounted && (
          <div className='mx-auto w-full max-w-md px-4 py-4'>
            <DrawerHeader>
              <DrawerTitle className='text-base font-semibold'>
                {title}
              </DrawerTitle>
            </DrawerHeader>

            <div className='pt-2'>{renderPanelContent?.()}</div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
