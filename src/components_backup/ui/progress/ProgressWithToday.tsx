'use client';

import { Progress } from '@/components_backup/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressWithTodayProps {
  value: number;
  startDate?: string;
  endDate?: string;
  label?: string;
  className?: string;
}

const getTodayRate = (start?: string, end?: string) => {
  if (!start || !end) return 100;
  const today = new Date();
  const s = new Date(start);
  const e = new Date(end);
  if (today < s) return 0;
  if (today > e) return 100;
  const total = e.getTime() - s.getTime();
  const current = today.getTime() - s.getTime();
  return Math.round((current / total) * 100);
};

const isInRange = (start?: string, end?: string) => {
  if (!start || !end) return false;
  const today = new Date();
  return today >= new Date(start) && today <= new Date(end);
};

export default function ProgressWithToday({
  value,
  startDate,
  endDate,
  label = 'Today',
  className,
}: ProgressWithTodayProps) {
  const todayRate = getTodayRate(startDate, endDate);
  const showToday = isInRange(startDate, endDate);

  const isOver = value > 100;

  return (
    <div className={cn('relative w-full', className)}>
      {/* 📍 오늘 기준선 & 말풍선 */}
      {showToday && (
        <>
          <div
            className="absolute z-20 flex flex-col items-center text-xs"
            style={{
              left: `${todayRate}%`,
              top: '-1.75rem',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-card text-muted-foreground border border-border shadow-sm">
              {label}
            </div>
            <div
              className="w-2 h-2 rotate-45 bg-card border border-border"
              style={{ marginTop: '-4px' }}
            />
          </div>

          <div
            className="absolute top-0 bottom-0 w-[1px] bg-border z-10"
            style={{
              left: `${todayRate}%`,
              transform: 'translateX(-50%)',
            }}
          />
        </>
      )}

      {/* ✅ 실제 프로그레스 바 */}
      <Progress
        value={value}
        className="h-8 rounded-md bg-border border border-input shadow-inner"
      />

      {/* 퍼센트 텍스트 */}
      <div
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold z-20',
          isOver ? 'text-destructive' : 'text-foreground'
        )}
      >
        {value.toFixed(1)}%
      </div>
    </div>
  );
}
