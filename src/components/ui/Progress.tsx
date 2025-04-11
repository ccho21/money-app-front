'use client';

import React from 'react';

interface ProgressProps {
  value: number; // 지출률
  label?: string; // 예: "Today"
  startDate?: string;
  endDate?: string;
}

const getTodayProgressPercent = (
  startDate?: string,
  endDate?: string
): number => {
  if (!startDate || !endDate) return 100;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  if (today < start) return 0;
  if (today > end) return 100;

  const total = end.getTime() - start.getTime();
  const current = today.getTime() - start.getTime();
  return Math.round((current / total) * 100);
};

export default function Progress({
  value,
  label = 'Today',
  startDate,
  endDate,
}: ProgressProps) {
  const todayPercent = getTodayProgressPercent(startDate, endDate);

  return (
    <div className='relative w-full h-8'>
      {/* 기준 마커 + 말풍선 */}
      <div
        className='absolute flex flex-col items-center text-xs z-10'
        style={{
          left: `${todayPercent}%`,
          top: '-100%',
          transform: 'translateX(-50%)',
        }}
      >
        {/* 말풍선 본체 */}
        <div className='px-2 py-1 rounded-full text-[11px] font-medium shadow-md whitespace-nowrap bg-surface text-foreground border border-border'>
          {label}
        </div>

        {/* 꼬리 (rotate + border + z-index) */}
        <div
          className='w-2 h-2 rotate-45 bg-surface border border-border -z-10'
          style={{
            marginTop: '-4px',
          }}
        />
      </div>

      {/* 기준 마커 선 */}
      <div
        className='absolute top-0 bottom-0 w-[1px] bg-muted z-0'
        style={{
          left: `${todayPercent}%`,
          transform: 'translateX(-50%)',
        }}
      />

      {/* 프로그레스 바 */}
      <div className='w-full h-8 rounded-md overflow-hidden bg-border'>
        <div
          className='h-full transition-all duration-300 ease-out bg-primary'
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
