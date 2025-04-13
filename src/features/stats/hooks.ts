// src/features/stats/service.ts

import { DateFilterParams } from '@/features/shared/types';
import {
  fetchStatsCategoryByCategoryIdAPI,
  fetchStatByBudgetAPI,
  fetchStatByCategoryAPI,
  fetchStatsByNoteAPI,
  fetchStatsSummaryByCategoryIdAPI,
  fetchStatsSummaryByBudgetAPI,
  fetchStatsSummaryByNoteAPI,
  fetchStatsNoteDetailAPI,
} from '@/features/stats/api';
import { useStatsStore } from '@/stores/useStatsStore';

export const fetchStatsByCatgory = async (params: DateFilterParams) => {
  const {
    actions: { setCategoryResponse, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatByCategoryAPI(params);
    setCategoryResponse(data);
  } catch (e) {
    console.error('❌ 예산 사용 분석 데이터 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};

export const fetchStatsByBudget = async (params: DateFilterParams) => {
  const {
    actions: { setBudgetResponse, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatByBudgetAPI(params);
    setBudgetResponse(data);
  } catch (e) {
    console.error('❌ 예산 사용 분석 데이터 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};

export const fetchStatsByNote = async (params: DateFilterParams) => {
  const {
    actions: { setNoteResponse, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatsByNoteAPI(params);
    setNoteResponse(data);
  } catch (e) {
    console.error('❌ 노트 통계 데이터 불러오기 실패:', e); // ✅ 수정된 로그
  } finally {
    setLoading(false);
  }
};

export const fetchStatsCategoryByCategoryId = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const {
    actions: { setCategoryDetailResponse, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatsCategoryByCategoryIdAPI(categoryId, params);

    setCategoryDetailResponse(data);
  } catch (e) {
    console.error('❌ 예산 사용 분석 데이터 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};

export const fetchStatsBudgetByCategoryId = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const {
    actions: { setBudgetDetailResponse, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatsCategoryByCategoryIdAPI(categoryId, params);
    setBudgetDetailResponse(data);
  } catch (e) {
    console.error('❌ 예산 사용 분석 데이터 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};

export const fetchStatsSummaryByCategoryId = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const {
    actions: { setstatsSummaryCategoryResposne, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatsSummaryByCategoryIdAPI(categoryId, params);
    setstatsSummaryCategoryResposne(data);
  } catch (e) {
    console.error('❌ 예산 사용 분석 데이터 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};

export const fetchStatsSummaryByBudget = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const {
    actions: { setstatsSummaryBudgetResposne, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatsSummaryByBudgetAPI(categoryId, params);
    setstatsSummaryBudgetResposne(data);
  } catch (e) {
    console.error('❌ 예산 사용 분석 데이터 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};

export const fetchStatsNoteDetail = async (
  note: string,
  params: DateFilterParams
) => {
  const {
    actions: { setNoteDetailResponse, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatsNoteDetailAPI(note, params);
    setNoteDetailResponse(data);
  } catch (e) {
    console.error('❌ 노트 상세 통계 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};

export const fetchStatsSummaryByNote = async (
  note: string,
  params: DateFilterParams
) => {
  const {
    actions: { setNoteSummaryResponse, setLoading },
  } = useStatsStore.getState();

  setLoading(true);
  try {
    const data = await fetchStatsSummaryByNoteAPI(note, params);
    setNoteSummaryResponse(data);
  } catch (e) {
    console.error('❌ 노트 통계 상세 데이터 불러오기 실패:', e);
  } finally {
    setLoading(false);
  }
};
