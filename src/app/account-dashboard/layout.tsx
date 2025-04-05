"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import BottomTabBar from "@/components/common/BottomTabBar";
import DateNavigator from "@/components/ui/DateNavigator";
import TabMenu from "@/components/common/TabMenu";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { TransactionType } from "@/features/transaction/types";
import TopNav from "@/components/common/TopNav";

export default function StatsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const {
    actions: { setTransactionType, getSyncedURLFromState },
    state: { transactionType },
  } = useDateFilterStore();

  // ✅ 최초 마운트 시 URL의 date → store 동기화
  useEffect(() => {
    if (typeParam) {
      setTransactionType(typeParam as TransactionType);
    }
  }, [typeParam, transactionType]);

  const tabs = [
    { key: "expense", label: "Expense" },
    { key: "income", label: "Income" },
  ];

  const handleTabChange = (key: string) => {
    setTransactionType(key as TransactionType);
    const syncedURL = getSyncedURLFromState(true);

    router.replace(`${syncedURL}`);
  };

  return (
    <div className="min-h-screen pb-[10vh] flex flex-col h-full">
      <TopNav
        title={"Accounts"}
        onAdd={() => router.push("/account/new")}
      ></TopNav>
      <main className="flex-1 overflow-y-auto bg-gray-100">{children}</main>
      <BottomTabBar />
    </div>
  );
}
