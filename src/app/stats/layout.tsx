'use client';

import React, { useState } from 'react';
import { ReactNode } from 'react';
import TopNav from '@/components/common/TopNav';
import BottomTabBar from '@/components/common/BottomTabBar';
import { cn } from '@/features/shared/utils';
import StatsView from './_components/StatsView';
import BudgetView from './_components/BudgetView';
import NoteView from './_components/NoteView';
import StatsHeader from './_components/StatsHeader';
import YearNavigator from '@/components/ui/YearNavigator';

const VIEW_MODES = ['Stats', 'Budget', 'Note'] as const;

export default function StatsLayout({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] =
    useState<(typeof VIEW_MODES)[number]>('Stats');

  const renderView = () => {
    switch (viewMode) {
      case 'Stats':
        return <StatsView />;
      case 'Budget':
        return <BudgetView />;
      case 'Note':
        return <NoteView />;
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <TopNav title={'Stats.'} />
      <StatsHeader viewMode={viewMode} setViewMode={setViewMode} />
      <YearNavigator></YearNavigator>
      {/* 콘텐츠 */}
      <main className='flex-1 overflow-y-auto'>
        {renderView()}
        {children}
      </main>

      <BottomTabBar />
    </div>
  );
}
