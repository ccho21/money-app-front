// src/lib/layout.config.ts
import { LayoutOptions } from '@/modules/shared/stores/useUIStore';

export const getDefaultLayoutOptions = (pathname: string): LayoutOptions => {
  if (matchPath(pathname, '')) {
    return {
      hideTabMenu: false,
      hideDateNav: true,
      hideMonthNav: false,
      hideSummaryBox: false,
    };
  }

  if (matchPath(pathname, '/dashboard/calendar')) {
    return {
      hideTabMenu: false,
      hideDateNav: false,
      hideMonthNav: true,
      hideSummaryBox: true,
    };
  }

  if (matchPath(pathname, '/stats/category/[categoryId]')) {
    return {
      hideDateNav: false,
      hideStatsHeader: true,
      hideTabMenu: true,
    };
  }

  if (matchPath(pathname, '/stats/budget/[categoryId]')) {
    return {
      hideDateNav: false,
      hideStatsHeader: true,
      hideTabMenu: true,
    };
  }

  // Default fallback
  return {
    hideDateNav: false,
    hideStatsHeader: false,
    hideTabMenu: false,
  };
};
const matchPath = (pathname: string, pattern: string): boolean => {
  const regex = new RegExp(
    '^' +
      pattern
        .replace(/\//g, '\\/') // 슬래시 escape
        .replace(/\[.*?\]/g, '[^/]+') + // [param] → 모든 단일 경로
      '$'
  );
  return regex.test(pathname);
};
