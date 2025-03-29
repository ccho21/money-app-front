import { api } from "@/features/shared/api";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { BudgetUsageItem } from "@/features/budget/types";
import { AccountTransactionSummaryParams } from "@/features/accounts/types";

interface BudgetState {
  budgetUsageItems: BudgetUsageItem[];
  isLoading: boolean;
  error: string | null;

  fetchBudgetUsage: ({
    startDate,
    endDate,
  }: AccountTransactionSummaryParams) => Promise<void>;
  clear: () => void;
}

export const useBudgetStore = create<BudgetState>()(
  devtools((set) => ({
    budgetUsageItems: [],
    isLoading: false,
    error: null,

    fetchBudgetUsage: async ({
      startDate,
      endDate,
    }: AccountTransactionSummaryParams) => {
      set({ isLoading: true, error: null }, false, "fetchBudgetUsage:loading");
      try {
        const params = new URLSearchParams();
        params.append("startDate", String(startDate));
        params.append("endDate", String(endDate));
        const res = await api<BudgetUsageItem[]>(
          `/budgets/usage?${params.toString()}`,
          { method: "GET" }
        );
        set(
          { budgetUsageItems: res, isLoading: false },
          false,
          "fetchBudgetUsage:success"
        );
      } catch (err) {
        set(
          {
            isLoading: false,
            error: err instanceof Error ? err.message : "예산 데이터 오류",
          },
          false,
          "fetchBudgetUsage:error"
        );
      }
    },

    clear: () =>
      set(
        {
          budgetUsageItems: [],
          isLoading: false,
          error: null,
        },
        false,
        "clearBudgetState"
      ),
  }))
);
