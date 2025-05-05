// src/app/stats/layout.tsx

import StatsShell from '@/components/shell/StatsShell';

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StatsShell>{children}</StatsShell>;
}
