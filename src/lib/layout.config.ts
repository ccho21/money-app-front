import { LayoutOptions } from '@/stores/useUIStore';

export const getDefaultLayoutOptions = (pathname: string): LayoutOptions => {
  console.log('### PATH NAME', pathname);

  if (matchPath(pathname, '/stats/category/[categoryId]')) {
    return {
      hideTopNav: false,
      hideDateNav: false,
      hideStatsHeader: true,
      hideTabMenu: true,
    };
  }

  if (matchPath(pathname, '/stats/budget/[categoryId]')) {
    return {
      hideTopNav: false,
      hideDateNav: false,
      hideStatsHeader: true,
      hideTabMenu: true,
    };
  }

  // Default fallback
  return {
    hideTopNav: true,
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
