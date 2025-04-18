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
  fetchStatBudgetByCategoryIdAPI,
} from '@/features/stats/api';
import { useStatsStore } from '@/stores/useStatsStore';

//
// Fetch grouped category stats
//
export const fetchStatsByCategory = async (params: DateFilterParams) => {
  const { setCategoryResponse, setLoading } = useStatsStore.getState().actions;

  setLoading(true);
  try {
    const data = await fetchStatByCategoryAPI(params);
    setCategoryResponse(data);
  } catch (e) {
    console.error('Failed to fetch category stats:', e);
  } finally {
    setLoading(false);
  }
};

//
// Fetch grouped budget stats
//
export const fetchStatsByBudget = async (params: DateFilterParams) => {
  const { setBudgetResponse, setLoading } = useStatsStore.getState().actions;

  setLoading(true);
  try {
    const data = await fetchStatByBudgetAPI(params);
    setBudgetResponse(data);
  } catch (e) {
    console.error('Failed to fetch budget stats:', e);
  } finally {
    setLoading(false);
  }
};

//
// Fetch grouped note stats
//
export const fetchStatsByNote = async (params: DateFilterParams) => {
  const { setNoteResponse, setLoading } = useStatsStore.getState().actions;

  setLoading(true);
  try {
    const data = await fetchStatsByNoteAPI(params);
    setNoteResponse(data);
  } catch (e) {
    console.error('Failed to fetch note stats:', e);
  } finally {
    setLoading(false);
  }
};

//
// Fetch category detail stats
//
export const fetchStatsCategoryByCategoryId = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const { setCategoryDetailResponse, setLoading } =
    useStatsStore.getState().actions;

  setLoading(true);
  try {
    const data = await fetchStatsCategoryByCategoryIdAPI(categoryId, params);
    setCategoryDetailResponse(data);
  } catch (e) {
    console.error('Failed to fetch category detail:', e);
  } finally {
    setLoading(false);
  }
};

//
// Fetch budget detail stats
//
export const fetchStatsBudgetByCategoryId = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const { setBudgetDetailResponse, setLoading } =
    useStatsStore.getState().actions;

  setLoading(true);
  try {
    const data = await fetchStatBudgetByCategoryIdAPI(categoryId, params);
    setBudgetDetailResponse(data);
  } catch (e) {
    console.error('Failed to fetch budget detail:', e);
  } finally {
    setLoading(false);
  }
};

//
// Fetch category summary
//
export const fetchStatsSummaryByCategoryId = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const { setCategorySummaryResponse, setLoading } =
    useStatsStore.getState().actions;

  setLoading(true);
  try {
    const data = await fetchStatsSummaryByCategoryIdAPI(categoryId, params);
    setCategorySummaryResponse(data);
  } catch (e) {
    console.error('Failed to fetch category summary:', e);
  } finally {
    setLoading(false);
  }
};

//
// Fetch budget summary
//
export const fetchStatsSummaryByBudget = async (
  categoryId: string,
  params: DateFilterParams
) => {
  const { setBudgetSummaryResponse, setLoading } =
    useStatsStore.getState().actions;

  setLoading(true);
  try {
    const data = await fetchStatsSummaryByBudgetAPI(categoryId, params);
    setBudgetSummaryResponse(data);
  } catch (e) {
    console.error('Failed to fetch budget summary:', e);
  } finally {
    setLoading(false);
  }
};

//
// Fetch note detail stats
//
export const fetchStatsNoteDetail = async (
  note: string,
  params: DateFilterParams
) => {
  const { setNoteDetailResponse, setLoading } =
    useStatsStore.getState().actions;

  setLoading(true);
  try {
    const data = await fetchStatsNoteDetailAPI(note, params);
    setNoteDetailResponse(data);
  } catch (e) {
    console.error('Failed to fetch note detail:', e);
  } finally {
    setLoading(false);
  }
};

//
// Fetch note summary
//
export const fetchStatsSummaryByNote = async (
  note: string,
  params: DateFilterParams
) => {
  const { setNoteSummaryResponse, setLoading } =
    useStatsStore.getState().actions;

  setLoading(true);
  try {
    const data = await fetchStatsSummaryByNoteAPI(note, params);
    setNoteSummaryResponse(data);
  } catch (e) {
    console.error('Failed to fetch note summary:', e);
  } finally {
    setLoading(false);
  }
};
