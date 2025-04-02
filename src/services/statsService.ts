// src/features/stats/service.ts

import { StatsParams } from '@/features/shared/types';
import {
  fetchStatCategoryByCategoryIdAPI,
  fetchStatsByBudgetAPI,
  fetchStatsByCategoryAPI,
  fetchStatsByNoteAPI,
} from '@/features/stats/api';
import { useStatsStore } from '@/stores/useStatsStore';

export const fetchStatsByCatgory = async (params: StatsParams) => {
  const {
    actions: { setCategories, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatsByCategoryAPI(params);
    setCategories(data);
  } catch (e) {
    console.error('❌ 예산 사용 분석 데이터 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};

export const fetchStatsByBudget = async (params: StatsParams) => {
  const {
    actions: { setBudgetResponse, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatsByBudgetAPI(params);
    setBudgetResponse(data);
  } catch (e) {
    console.error('❌ 예산 사용 분석 데이터 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};

export const fetchStatsByNote = async (params: StatsParams) => {
  const {
    actions: { setNoteResponse, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatsByNoteAPI(params);
    setNoteResponse(data);
  } catch (e) {
    console.error('❌ 예산 사용 분석 데이터 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};

export const fetchStatsCategoryByCategoryId = async (
  categoryId: string,
  params: StatsParams
) => {
  const {
    actions: { setStatsCategoryResponse, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatCategoryByCategoryIdAPI(categoryId, params);
    setStatsCategoryResponse(data);
  } catch (e) {
    console.error('❌ 예산 사용 분석 데이터 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};
