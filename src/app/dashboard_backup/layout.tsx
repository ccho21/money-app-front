// src/app/dashboard/layout.tsx

import DashboardShell from '@/components_backup/shell/DashboardShell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
