"use client";

import { ReactNode } from "react";
import BottomTabBar from "@/components/common/BottomTabBar";
import TopNav from "@/components/common/TopNav";

export default function StatsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav title={"Stats. "} />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <BottomTabBar />
    </div>
  );
}
