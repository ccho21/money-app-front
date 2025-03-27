'use client';

import React, { useState } from 'react';
import { ReactNode } from 'react';
import TopNav from '@/components/common/TopNav';
import BottomTabBar from '@/components/common/BottomTabBar';
import StatsView from './_components/StatsView';
import BudgetView from './_components/BudgetView';
import NoteView from './_components/NoteView';
import StatsHeader from './_components/StatsHeader';
import DateNavigator from '@/components/ui/DateNavigator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VIEW_MODES = ['Stats', 'Budget', 'Note'] as const;

export default function StatsLayout({ children }: { children: ReactNode }) {
  const [date, setDate] = useState(new Date());
  useState<(typeof VIEW_MODES)[number]>('Stats');
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
      <DateNavigator date={date} onChange={setDate} mode='year' />
      {/* 콘텐츠 */}
      <main className='flex-1 overflow-y-auto'>
        {renderView()}
        {children}
      </main>

      <BottomTabBar />
    </div>
  );
}
