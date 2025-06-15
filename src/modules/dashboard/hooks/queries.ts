
import { useQuery } from '@tanstack/react-query';
import { TransactionGroupQuery } from '../../transaction/types/types';
import { fetchDashboardAPI } from '../api';
import { DashboardDTO } from '../types/types';

export const useDashboard = (params: TransactionGroupQuery) => {
  return useQuery<DashboardDTO>({
    queryKey: ['dashboard', params],
    queryFn: () => fetchDashboardAPI(params),
    enabled: !!params.startDate && !!params.endDate,
    staleTime: 1000 * 60 * 5, // 5분 캐시 유지
  });
};