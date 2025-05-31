// src/types/insight.ts

import { Timeframe } from '@/modules/transaction/types/types';

export type InsightType = 'pattern' | 'budget' | 'recurring' | 'alert';
export type InsightSeverity = 'info' | 'warning' | 'critical';

export interface InsightQuery {
  timeframe: Timeframe;
  startDate: string;
  endDate: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'pattern' | 'budget' | 'recurring' | 'alert';
  severity: 'info' | 'warning' | 'critical';
  icon?: string;
  createdAt: string;
  entityRef?: {
    type: 'budget' | 'category' | 'transaction';
    id: string;
  };
  context?: Record<string, unknown>;
  actionLabel?: string;
  actionUrl?: string;
}

export interface ChartDataItem {
  data: Record<string, number>;
  highlight?: {
    key: string;
    value: number;
  };
  meta?: {
    total?: number;
    average?: number;
    [key: string]: unknown;
  };
}

export interface PatternInsightResponse {
  insights: Insight[];
  byDay: ChartDataItem;
  byTime: ChartDataItem;
  timeframe: Timeframe;
  startDate: string;
  endDate: string;
}

export interface BudgetInsightResponse {
  insights: Insight[];
  byCategory: ChartDataItem;
  timeframe: Timeframe;
  startDate: string;
  endDate: string;
}

export interface RecurringInsightResponse {
  insights: Insight[];
  recurringSummary: ChartDataItem;
  timeframe: Timeframe;
  startDate: string; // e.g. '2025-05-01'
  endDate: string; // e.g. '2025-05-31'
}

export interface AlertInsightResponse {
  insights: Insight[];
  startDate: string;
  endDate: string;
  timeframe: string;
}