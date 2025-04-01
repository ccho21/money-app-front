import { get } from "@/features/shared/api";
import { StatsParams } from "../shared/types";
import {
  StatsByBudgetResponse,
  StatsByCategoryResponse,
  StatsByNoteResponse,
} from "./types";

export const fetchStatsByCategoryAPI = (
  params: StatsParams
): Promise<StatsByCategoryResponse> => {
  const query = new URLSearchParams();
  query.append("type", params.type);
  query.append("startDate", params.startDate);
  query.append("endDate", params.endDate);
  return get(`/stats/by-category?${query.toString()}`);
};

export const fetchStatsByBudgetAPI = (
  params: StatsParams
): Promise<StatsByBudgetResponse> => {
  const query = new URLSearchParams();
  query.append("type", params.type);
  query.append("startDate", params.startDate);
  query.append("endDate", params.endDate);
  return get(`/stats/by-budget?${query.toString()}`);
};

export const fetchStatsByNoteAPI = (
  params: StatsParams
): Promise<StatsByNoteResponse> => {
  const query = new URLSearchParams();
  query.append("type", params.type);
  query.append("startDate", params.startDate);
  query.append("endDate", params.endDate);
  return get(`/stats/by-note?${query.toString()}`);
};
