'use client';

import React from 'react';

interface ProgressProps {
  value: number; // 지출률
  label?: string; // 예: "Today"
  startDate?: string;
  endDate?: string;
}

const getTodayProgressRate = (startDate?: string, endDate?: string): number => {
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

const isTodayInRange = (startDate?: string, endDate?: string): boolean => {
  if (!startDate || !endDate) return false;
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return today >= start && today <= end;
};

export default function Progress({
  value,
  label = 'Today',
  startDate,
  endDate,
}: ProgressProps) {
  const todayRate = getTodayProgressRate(startDate, endDate);

  return (
    <div className='relative w-full h-8'>
      {isTodayInRange(startDate, endDate) && (
        <>
          {/* 기준 마커 + 말풍선 */}
          <div
            className='absolute flex flex-col items-center text-xs z-10'
            style={{
              left: `${todayRate.toFixed(1)}%`,
              top: '-100%',
              transform: 'translateX(-50%)',
            }}
          >
            <div className='px-2 py-1 rounded-full text-[11px] font-medium shadow-md whitespace-nowrap bg-surface text-foreground border border-border'>
              {label}
            </div>
            <div
              className='w-2 h-2 rotate-45 bg-surface border border-border -z-10'
              style={{ marginTop: '-4px' }}
            />
          </div>

          {/* 기준 마커 선 */}
          <div
            className='absolute top-0 bottom-0 w-[1px] bg-muted/20 z-0'
            style={{
              left: `${todayRate.toFixed(1)}%`,
              transform: 'translateX(-50%)',
            }}
          />
        </>
      )}

      {/* 프로그레스 바 */}
      <div className='w-full h-8 rounded-md overflow-hidden bg-border'>
        <div
          className='h-full transition-all duration-300 ease-out bg-primary flex items-center justify-end pr-2 text-white text-xs font-semibold'
          style={{ width: `${value.toFixed(1)}%` }}
        >
          {value.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
