// src/features/stats/service.ts

import { fetchStatsBudgetUsageAPI } from '@/features/stats/api';
import { StatsBudgetUsageParams } from '@/features/stats/types';
import { useStatsStore } from '@/stores/useStatsStore';

export const fetchStatsBudgetUsage = async (params: StatsBudgetUsageParams) => {
  const {
    actions: { setItems, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatsBudgetUsageAPI(params);
    setItems(data);
  } catch (e) {
    console.error('❌ 예산 사용 분석 데이터 불러오기 실패:', e);
    setItems([]); // fallback
  } finally {
    setLoading(false);
  }
};
