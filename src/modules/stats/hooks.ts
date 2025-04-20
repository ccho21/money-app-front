import { DateFilterParams } from '@/shared/types';
import {
  fetchStatsByCategory,
  fetchStatsByBudget,
  fetchStatsByNote,
  fetchStatsCategoryDetail,
  fetchStatsBudgetDetail,
  fetchStatsNoteDetail,
  fetchStatsCategorySummary,
  fetchStatsBudgetSummary,
  fetchStatsNoteSummary,
} from './api';
import { useStatsStore } from './store';

// [GROUP] category
export const fetchCategoryStats = async (params: DateFilterParams) => {
  const { setCategoryGroup, setLoading } = useStatsStore.getState();
  setLoading(true);
  try {
    const data = await fetchStatsByCategory(params);
    setCategoryGroup(data);
  } finally {
    setLoading(false);
  }
};

// [GROUP] budget
export const fetchBudgetStats = async (params: DateFilterParams) => {
  const { setBudgetGroup, setLoading } = useStatsStore.getState();
  setLoading(true);
  try {
    const data = await fetchStatsByBudget(params);
    setBudgetGroup(data);
  } finally {
    setLoading(false);
  }
};

// [GROUP] note
export const fetchNoteStats = async (params: DateFilterParams) => {
  const { setNoteGroup, setLoading } = useStatsStore.getState();
  setLoading(true);
  try {
    const data = await fetchStatsByNote(params);
    setNoteGroup(data);
  } finally {
    setLoading(false);
  }
};

// [DETAIL] category/:id
export const fetchCategoryDetail = async (
  id: string,
  params: DateFilterParams
) => {
  const { setCategoryDetail, setLoading } = useStatsStore.getState();
  setLoading(true);
  try {
    const data = await fetchStatsCategoryDetail(id, params);
    setCategoryDetail(data);
  } finally {
    setLoading(false);
  }
};

// [DETAIL] budget/:id
export const fetchBudgetDetail = async (
  id: string,
  params: DateFilterParams
) => {
  const { setBudgetDetail, setLoading } = useStatsStore.getState();
  setLoading(true);
  try {
    const data = await fetchStatsBudgetDetail(id, params);
    setBudgetDetail(data);
  } finally {
    setLoading(false);
  }
};

// [DETAIL] note/:note
export const fetchNoteDetail = async (
  note: string,
  params: DateFilterParams
) => {
  const { setNoteDetail, setLoading } = useStatsStore.getState();
  setLoading(true);
  try {
    const data = await fetchStatsNoteDetail(note, params);
    setNoteDetail(data);
  } finally {
    setLoading(false);
  }
};

// [SUMMARY] category
export const fetchCategorySummary = async (params: DateFilterParams) => {
  const { setCategorySummary, setLoading } = useStatsStore.getState();
  setLoading(true);
  try {
    const data = await fetchStatsCategorySummary(params);
    setCategorySummary(data);
  } finally {
    setLoading(false);
  }
};

// [SUMMARY] budget
export const fetchBudgetSummary = async (params: DateFilterParams) => {
  const { setBudgetSummary, setLoading } = useStatsStore.getState();
  setLoading(true);
  try {
    const data = await fetchStatsBudgetSummary(params);
    setBudgetSummary(data);
  } finally {
    setLoading(false);
  }
};

// [SUMMARY] note
export const fetchNoteSummary = async (params: DateFilterParams) => {
  const { setNoteSummary, setLoading } = useStatsStore.getState();
  setLoading(true);
  try {
    const data = await fetchStatsNoteSummary(params);
    setNoteSummary(data);
  } finally {
    setLoading(false);
  }
};
