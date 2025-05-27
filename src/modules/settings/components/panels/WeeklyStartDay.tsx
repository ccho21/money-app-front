'use client';

import { useState } from 'react';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';

export default function WeeklyStartDay() {
  const { weeklyStartDay, setWeeklyStartDay } = useUserSettingStore();

  return (
    <div className='layout-body bg-surface text-foreground rounded-md'>
      <h2
        className='text-title font-semibold text-center mb-spacious'
        role='heading'
        aria-level={2}
      >
        Weekly start day
      </h2>
    </div>
  );
}
