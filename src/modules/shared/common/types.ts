import { Timeframe } from '@/modules/transaction/types/types';

export interface DateRangeOptions {
  unit: Timeframe;
  amount?: number; // 기본 단위만큼 더할 값 (기본값은 1)
  customEndDate?: Date; // unit이 'custom'일 경우 종료일 지정
}
