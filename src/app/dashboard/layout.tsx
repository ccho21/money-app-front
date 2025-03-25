"use client";

import { ReactNode } from "react";
import BottomTabBar from "@/components/common/BottomTabBar";
import TopNav from "@/components/common/TopNav";
import TabMenu from "@/components/common/TabMenu";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const current = pathname.split('/')[2] || 'daily';
  const tabs = [
    { key: 'daily', label: 'Daily' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'summary', label: 'Summary' },
  ];

  return (
    <div className="min-h-screen pb-16">
        <TopNav title="Trans." />
        <TabMenu tabs={tabs} active={current} onChange={(key) => router.push(`/dashboard/${key}`)} />
        {children}
        <BottomTabBar />
      </div>
  );
}
