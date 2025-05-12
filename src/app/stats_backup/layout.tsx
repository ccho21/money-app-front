// src/app/stats/layout.tsx

import StatsShell from '@/components_backup/shell/StatsShell';

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StatsShell>{children}</StatsShell>;
}
