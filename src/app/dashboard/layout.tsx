// src/app/dashboard/layout.tsx

import DashboardShell from '../../modules/dashboard/components/view/DashboardShell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
